import { CACHE_MANAGER, Inject, BadRequestException, Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { pick } from 'lodash';
import { Cache } from 'cache-manager';
import { FileType } from '@prisma/client';
import { PDFService } from '@t00nday/nestjs-pdf';
import { ConfigService } from '@nestjs/config';

import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IssuerService } from '../issuer/issuer.service';
import { CertificatesService } from '../certificates/certificates.service';
import { BuyersService } from '../buyers/buyers.service';
import { FilesService } from '../files/files.service';
import { firstValueFrom } from 'rxjs';
import { FileMetadataDto } from '../files/dto/file-metadata.dto';
import { ShortPurchaseDto } from './dto/short-purchase.dto';
import { FullPurchaseDto } from './dto/full-purchase.dto';
import { BigNumber } from 'ethers';

@Injectable()
export class PurchasesService {
  private readonly logger = new Logger(CertificatesService.name, { timestamp: true });

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private certificatesService: CertificatesService,
    private issuerService: IssuerService,
    private buyersService: BuyersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private pdfService: PDFService,
    private filesService: FilesService
  ) {
    this.logger.debug(`PG_TRANSACTION_TIMEOUT=${this.configService.get('PG_TRANSACTION_TIMEOUT') / 1000}s`);
  }

  async create(createPurchaseDtos: CreatePurchaseDto[]): Promise<FullPurchaseDto[]> {
    this.logger.log(`received request to create purchases: ${JSON.stringify(createPurchaseDtos)}`);

    const purchases: FullPurchaseDto[] = [];

    await this.prisma.$transaction(async (prisma) => {
      for (const createPurchaseDto of createPurchaseDtos) {

        const { filecoinNodes, ...purchase } = createPurchaseDto;

        if (filecoinNodes && filecoinNodes.length > 1) {
          throw new BadRequestException('only one filecoin node per transaction allowed');
        }

        if (filecoinNodes && filecoinNodes.length > 0) {
          const existingFilecoinNodes = await this.prisma.filecoinNode.findMany({ where: { id: { in: filecoinNodes.map(n => n.id) } } });
          if (filecoinNodes.length !== existingFilecoinNodes.length) {
            const nonExistingFilecoinNodes = filecoinNodes.filter(n => existingFilecoinNodes.findIndex((en) => en.id === n.id) < 0)
            this.logger.error(`purchase submitted for non-existing filecoin nodes: ${nonExistingFilecoinNodes.map(n=>n.id).join()}`);
            throw new NotFoundException();
          }
        }

        const certData = await this.certificatesService.findOne(purchase.certificateId);

        if (certData.initialSellerId !== createPurchaseDto.sellerId) {
          throw new BadRequestException(`certificate has to be owned by transaction seller`);
        }

        const buyerData = await this.buyersService.findOne(purchase.buyerId);

        if (!buyerData) {
          this.logger.warn(`purchase submitted for non-existing buyerId=${purchase.buyerId}`);
          throw new NotFoundException(`buyerId=${purchase.buyerId} not found`);
        }

        // TODO: Re-enable later after we re-enable blockchain interactions

        // if (!buyerData.blockchainAddress) {
        //   throw new Error(`buyer ${purchase.buyerId} has no blockchain address assigned`);
        // }

        if (filecoinNodes && filecoinNodes[0]) {

          const filecoinNodesNotOwned = (await this.prisma.filecoinNode.findMany({
            where: {
              id: { in: filecoinNodes.map(n => n.id) },
              buyerId: { not: purchase.buyerId }
            }
          }));

          if (filecoinNodesNotOwned.length > 0) {
            throw new BadRequestException(`filecoin nodes (${filecoinNodesNotOwned.map(n => n.id)}) have to be owned by the buyer`);
          }
        }

        const newRecord = await prisma.purchase.create({
          data: purchase
        }).catch(err => {
          this.logger.error(`error creating a new purchase: ${err}`);
          throw err;
        });

        if (filecoinNodes) {
          await prisma.filecoinNodesOnPurchases.createMany({
            data: filecoinNodes.map((n) => ({
              buyerId: newRecord.buyerId,
              purchaseId: newRecord.id,
              filecoinNodeId: n.id
            }))
          }).catch(err => {
            this.logger.error(`error linking filecoin nodes to the new purchase: ${err}`);
            throw err;
          });
        }

        await this.createAttestationForPurchases([newRecord.id]);

        let accountToRedeemFrom: string;

        if (filecoinNodes && filecoinNodes[0]) {
          const filecoinNode = filecoinNodes[0];

          const filecoinNodeData = await this.prisma.filecoinNode.findUnique({ where: { id: filecoinNode.id } });

          // TODO: Re-enable later after we re-enable blockchain interactions

          // if (!filecoinNodeData.blockchainAddress) {
          //   throw new Error(`filecoin node ${filecoinNode.id} has no blockchain address assigned`);
          // }


          accountToRedeemFrom = filecoinNodeData.blockchainAddress;
        } else {
          this.logger.debug(`no fielcoin node defined for purchase`);

          accountToRedeemFrom = buyerData.blockchainAddress;
        }

        const beneficiary = buyerData.name;

        try {
          await prisma.certificate.update({
            data: {
              beneficiary,
              redemptionDate: new Date() // TO-DO: Replace with the exact blockchain timestamp of the claiming action
            },
            where: { id: certData.id }
          });

          this.logger.debug(`set claim data for the certificate: ${certData.id}`);
        } catch (err) {
          this.logger.error(`error setting claim data for the certificate: ${certData.id}: ${err}`);
          throw err;
        }

        purchases.push(await this.findOne(newRecord.id));
      }
    }, { timeout: this.configService.get('PG_TRANSACTION_TIMEOUT') }).catch((err) => {
      this.logger.error('rolling back transaction');
      throw err;
    });

    return purchases;
  }

  async findAll(): Promise<ShortPurchaseDto[]> {
    const apiBaseUrl = this.configService.get('API_BASE_URL');
    const uiBaseURL = this.configService.get('UI_BASE_URL');

    return (await this.prisma.purchase.findMany({ select: { id: true } })).map((i) => ({
      ...i,
      pageUrl: `${uiBaseURL}/partners/filecoin/purchases/${i.id}`,
      dataUrl: `${apiBaseUrl}/api/partners/filecoin/purchases/${i.id}`,
    }));
  }

  async findOne(id: string): Promise<FullPurchaseDto> {
    const data = await this.prisma.purchase.findUnique({
      where: {
        id
      },
      include: {
        seller: true,
        buyer: { include: { filecoinNodes: true } },
        filecoinNodes: { include: { filecoinNode: true } },
        certificate: true,
        files: {
          select: {
            file: {
              include: {
                purchases: {
                  select: {
                    fileType: true
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!data) {
      return null;
    }

    return FullPurchaseDto.toDto({
      ...data,
      filecoinNodes: data.filecoinNodes.map((r) => r.filecoinNode),
      files: data.files.map(f => {
        const { purchases, ...file } = f.file;

        return {
          file: {
            ...file,
            fileType: purchases.pop()?.fileType
          }
        };
      }) 
    });
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    const { filecoinNodes, ...purchase } = updatePurchaseDto;

    return await this.prisma.$transaction(async (prisma) => {
      if (filecoinNodes) {
        const existingRecord = await prisma.purchase.findUnique({ where: { id } });

        if (!existingRecord) {
          throw new NotFoundException();
        }

        await prisma.filecoinNodesOnPurchases.deleteMany({
          where: { purchaseId: id }
        });

        await prisma.filecoinNodesOnPurchases.createMany({
          data: filecoinNodes.map((n) => ({
            buyerId: existingRecord.buyerId,
            purchaseId: id,
            filecoinNodeId: n.id
          }))
        });
      }

      await this.prisma.purchase.update({
        where: { id },
        data: purchase
      });

      const data = await prisma.purchase.findUnique({
        where: { id },
        include: { filecoinNodes: { select: { filecoinNode: true } } }
      });

      return { ...data, filecoinNodes: data.filecoinNodes.map(n => n.filecoinNode) };
    });
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.$transaction([
      this.prisma.filecoinNodesOnPurchases.deleteMany({ where: { purchaseId: id } }),
      this.prisma.purchase.delete({ where: { id } })
    ]);

    return true;
  }

  async createAttestationForPurchases(ids: string[]): Promise<FileMetadataDto[]> {
    this.logger.debug(`Generating an attestation for purchases ${ids.join(', ')}`);

    const dtos: FileMetadataDto[] = [];

    for (const id of ids) {
      const savedPurchase = await this.prisma.purchase.findUnique({
        where: { id },
        include: {
          certificate: true,
          filecoinNodes: true,
          files: true
        }
      });

      if (savedPurchase.files.length > 0 && savedPurchase.files.some(file => file.fileId)) {
        for (const fileOnPurchase of savedPurchase.files) {
          const file = await this.filesService.findOne(fileOnPurchase.fileId);

          if (file.fileType === FileType.ATTESTATION) {
            throw new ConflictException(`Attestation already exists for purchase ${savedPurchase.id}`);
          }
        }
      } 

      const fileBuffer = await firstValueFrom(this.pdfService.toBuffer('attestation', {
        locals: {
          minerId: savedPurchase.filecoinNodes.map(n => n.filecoinNodeId).join(', '),
          orderQuantity: BigNumber.from(savedPurchase.certificate.energyWh).div(1e6).toString(),
          country: savedPurchase.certificate.country.toString(),
          state: savedPurchase.certificate.region,
          generationPeriod: `${savedPurchase.certificate.generationStart.toDateString()} - ${savedPurchase.certificate.generationEnd.toDateString()}`,
          generator: {
            id: savedPurchase.certificate.generatorId,
            providerId: savedPurchase.sellerId,
            name: savedPurchase.certificate.generatorName,
            capacity: savedPurchase.certificate.nameplateCapacityW ? savedPurchase.certificate.nameplateCapacityW / 1e6 : 'N/A',
            fuelType: savedPurchase.certificate.energySource.toString(),
            operationStart: savedPurchase.certificate.commissioningDate?.toDateString() ?? 'N/A',
            label: savedPurchase.certificate.label?.toString() ?? 'N/A'
          },
          purchaseUiLink: `${process.env.UI_BASE_URL}/partners/filecoin/purchases/${savedPurchase.id}`
        },
      }));

      const dto = await this.filesService.create(`Zero_EAC-Attestation_${id}.pdf`, fileBuffer, [id], FileType.ATTESTATION);

      dtos.push(dto);
    }

    return dtos;
  }

  async getChainEvents(id: string) {
    const purchase = await this.prisma.purchase.findUnique({ where: { id } });

    if (!purchase) {
      throw new NotFoundException(`${id} purchase not found`);
    }

    const cacheKey = `purchase:${id}:chain-events`;

    const purchaseEventsCached = await this.cacheManager.get(cacheKey);

    const certificate = await this.prisma.certificate.findUnique({ where: { id: purchase.certificateId } });

    if (!certificate) {
      throw new NotFoundException(`${purchase.certificateId} certificate not found`);
    }

    if (purchaseEventsCached) {
      this.logger.debug(`cache hit (cacheKey=${cacheKey})`);
      return purchaseEventsCached;
    } else {
      this.logger.debug(`cache miss (cacheKey=${cacheKey})`);

      const issuerApiCerData = await this.issuerService.getCertificateByTransactionHash(certificate.txHash);

      const events = (await this.issuerService.getCertificateEvents(issuerApiCerData.id))
        .filter((event) => event.name === 'TransferSingle')
        .map(e => ({
          ...e,
          date: new Date(e.timestamp * 1000),
          recs: e.value ? BigInt(e.value.hex).toString() : undefined
        }))
        .map((event) => pick(event, [
          'name',
          'timestamp',
          'transactionHash',
          'blockHash',
          'from',
          'to',
          'recs'
        ]));

      const lastTransactionHash = purchase.txHash;

      const indexOfClaimTransaction = events.findIndex((event) => {
        return event.to === '0x0000000000000000000000000000000000000000' && event.transactionHash === lastTransactionHash;
      });

      const purchaseEvents = [];

      if (indexOfClaimTransaction > -1) {
        events[indexOfClaimTransaction].name = 'Certificate Redemption';
        purchaseEvents.unshift(events[indexOfClaimTransaction]);
      }

      let cursor = indexOfClaimTransaction - 1;

      while (cursor > -1) {
        const currentEvent = events[cursor];
        const lastMatchedEvent = purchaseEvents[0];

        if (currentEvent.recs === events[indexOfClaimTransaction].recs && currentEvent.to === lastMatchedEvent.from) {
          currentEvent.name = 'Transfer of Ownership';
          purchaseEvents.unshift(currentEvent);
        }

        cursor--;
      }

      events[1].name = 'Transfer of Ownership';
      purchaseEvents.unshift(events[1]); // transfer to escrow
      events[0].name = 'On Chain Registration';
      purchaseEvents.unshift(events[0]); // cert. issuance

      const ttl = this.configService.get('CHAIN_EVENTS_TTL');
      this.logger.debug(`saving data to cache (cacheKey=${cacheKey}, ttl=${ttl}s)`);
      this.cacheManager.set(cacheKey, purchaseEvents, { ttl });

      return purchaseEvents;
    }
  }
}

export const purchaseEventsSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'On Chain Registration'
      },
      timestamp: {
        type: 'number',
        example: 1635372100
      },
      transactionHash: {
        type: 'string',
        example: '0x34fc277d9748647b3f2de3e38941bb859d77caed62349ab4e12e3d3853681e77'
      },
      blockHash: {
        type: 'string',
        example: '0x75a45ef1232f1210586477d57d5aa666261911b3d4e5fc0a46fbcf23ec28a694'
      },
      from: {
        type: 'string',
        example: '0x0000000000000000000000000000000000000000'
      },
      to: {
        type: 'string',
        example: '0xd46aC0Bc23dB5e8AfDAAB9Ad35E9A3bA05E092E8'
      },
      recs: {
        type: 'string',
        example: '10000'
      }
    },
    required: ['name']
  }
};
