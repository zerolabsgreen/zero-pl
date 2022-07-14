import { BadRequestException, Injectable, Logger, NotFoundException, ConflictException, PreconditionFailedException } from '@nestjs/common';
import { PDFService } from '@t00nday/nestjs-pdf';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { BigNumber, constants } from 'ethers';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IssuerService } from '../issuer/issuer.service';
import { CertificatesService } from '../certificates/certificates.service';
import { BuyersService } from '../buyers/buyers.service';
import { FilesService } from '../files/files.service';
import { FileMetadataDto } from '../files/dto/file-metadata.dto';
import { ShortPurchaseDto } from './dto/short-purchase.dto';
import { FullPurchaseDto } from './dto/full-purchase.dto';
import { SellersService } from '../sellers/sellers.service';
import { PaginatedDto } from '../utils/paginated.dto';
import { BatchService } from '../batches/batch.service';
import { PurchaseEventDTO } from './dto/purchase-event.dto';
import { ContractsService } from '../contracts/contracts.service';
import { getClaimData } from './utils';
import { ClaimPurchaseData } from './purchase.processor';

@Injectable()
export class PurchasesService {
  private readonly logger = new Logger(CertificatesService.name, { timestamp: true });

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private certificatesService: CertificatesService,
    private issuerService: IssuerService,
    private sellersService: SellersService,
    private buyersService: BuyersService,
    private pdfService: PDFService,
    private filesService: FilesService,
    private batchService: BatchService,
    private contractsService: ContractsService,
    @InjectQueue('purchase') private readonly purchaseQueue: Queue<ClaimPurchaseData>,
  ) {
    this.logger.debug(`PG_TRANSACTION_TIMEOUT=${this.configService.get('PG_TRANSACTION_TIMEOUT') / 1000}s`);
  }

  async create(createPurchaseDtos: CreatePurchaseDto[]): Promise<FullPurchaseDto[]> {
    this.logger.log(`received request to create purchases: ${JSON.stringify(createPurchaseDtos)}`);

    const purchases: FullPurchaseDto[] = [];

    await this.prisma.$transaction(async (prisma) => {
      for (const createPurchaseDto of createPurchaseDtos) {
        const { filecoinNodeId, ...purchase } = createPurchaseDto;

        if (!filecoinNodeId) {
          throw new BadRequestException(`filecoinNodeId need to be set`)
        }

        const existingFilecoinNode = await prisma.filecoinNode.findFirst({ where: { id: filecoinNodeId } });

        if (!existingFilecoinNode) {
          this.logger.error(`purchase submitted for non-existing filecoin node: ${filecoinNodeId}`);
          throw new NotFoundException();
        }

        const certData = await this.certificatesService.findOne(purchase.certificateId);

        const purchasesForCertificate = await prisma.purchase.findMany({
          where: {
            certificateId: purchase.certificateId
          }
        });

        const availableCertificateVolume = BigNumber.from(
          certData.energyWh
        ).sub(purchasesForCertificate.reduce(
          (partialSum, purchase) => BigInt(partialSum) + BigInt(purchase.recsSoldWh), BigInt(0)
        ).toString());

        if (availableCertificateVolume.lte(0) || BigNumber.from(purchase.recsSoldWh).gt(availableCertificateVolume)) {
          throw new BadRequestException(`Not enough available certificate volume for cert ${certData.id}. Available: ${availableCertificateVolume.toString()}`);
        }
        
        if (certData.initialSellerId !== createPurchaseDto.sellerId) {
          throw new BadRequestException(`certificate has to be owned by transaction seller`);
        }

        if (!certData.onchainId) {
          throw new PreconditionFailedException(`Certificate ${certData.id} does not have an on-chain ID set yet. Please mint the certificate on-chain.`);
        }

        const sellerData = await this.sellersService.findOne(purchase.sellerId);
        const buyerData = await this.buyersService.findOne(purchase.buyerId);

        if (!buyerData) {
          this.logger.warn(`purchase submitted for non-existing buyerId=${purchase.buyerId}`);
          throw new NotFoundException(`buyerId=${purchase.buyerId} not found`);
        }

        if (!buyerData.blockchainAddress) {
          throw new Error(`buyer ${purchase.buyerId} has no blockchain address assigned`);
        }

        const filecoinNodesOwned = (await prisma.filecoinNode.findMany({
          where: {
            id: filecoinNodeId,
            buyerId: purchase.buyerId
          },
          select: {
            id: true
          }
        }));

        if (!filecoinNodesOwned.map(f => f.id).includes(filecoinNodeId)) {
          throw new BadRequestException(`filecoin node (${filecoinNodeId}) has to be owned by the buyer (${buyerData.id})`);
        }

        const newPurchase = await prisma.purchase.create({
          data: {
            ...purchase,
            recsSoldWh: BigInt(purchase.recsSoldWh),
            filecoinNodeId: filecoinNodeId
          }
        }).catch(err => {
          this.logger.error(`error creating a new purchase: ${err}`);
          throw err;
        });

        if (newPurchase.contractId) {
          const contract = await this.contractsService.findOne(newPurchase.contractId);

          if (!contract) {
            throw new BadRequestException(`Contract ${newPurchase.contractId} doesn't exist`);
          }

          if (!contract.onchainId) {
            throw new BadRequestException(`Contract ${newPurchase.contractId} doesn't have an onchainId`);
          }

          const transferTxHash = await this.issuerService.transferCertificate({
            id: Number(certData.onchainId),
            from: sellerData.blockchainAddress,
            to: contract.onchainId,
            amount: purchase.recsSoldWh
          });

          // Push claiming to a queue, so that we don't have to wait for the transfer to finish and delay the request response
          await this.purchaseQueue.add('claim', {
            purchaseId: newPurchase.id,
            previousTx: transferTxHash
          });
        } else {
          const txHash = await this.issuerService.claimCertificate({
            id: Number(certData.onchainId),
            from: sellerData.blockchainAddress,
            to: buyerData.blockchainAddress,
            amount: purchase.recsSoldWh,
            claimData: getClaimData(await this.findOne(newPurchase.id))
          });

          await prisma.purchase.update({
            where: {
              id: purchase.id
            }, 
            data: { txHash }
          }).catch(err => {
            this.logger.error(`error updating the purchase with txHash: ${err}`);
            throw err;
          });
        }

        purchases.push(await this.findOne(newPurchase.id));
      }
    }, { timeout: this.configService.get('PG_TRANSACTION_TIMEOUT') }).catch((err) => {
      this.logger.error('rolling back transaction');
      throw err;
    });

    try {
      await this.createAttestationForPurchases(purchases.map(p => p.id));
    } catch (e) {
      this.logger.error(`Unable to generate an attestation for purchases ${purchases.map(p => p.id)}`);
      this.logger.error(e);
    }

    return purchases;
  }

  async findAll(query?: {
    skip?: number;
    take?: number;
  }): Promise<PaginatedDto<ShortPurchaseDto>> {
    const apiBaseUrl = this.configService.get('API_BASE_URL');
    const uiBaseURL = this.configService.get('UI_BASE_URL');

    const total = await this.prisma.purchase.count();

    const take = query?.take || total;
    const skip = query?.skip || 0;

    const purchases = (await this.prisma.purchase.findMany({
      skip,
      take,
      select: { id: true }
    })).map((i) => ({
      ...i,
      pageUrl: `${uiBaseURL}/partners/filecoin/purchases/${i.id}`,
      dataUrl: `${apiBaseUrl}/api/partners/filecoin/purchases/${i.id}`,
    }));

    return {
      data: purchases,
      total,
      count: purchases.length
    };
  }

  async findOne(id: string): Promise<FullPurchaseDto> {
    const purchase = await this.prisma.purchase.findUnique({
      where: {
        id
      },
      include: {
        seller: true,
        buyer: { include: { filecoinNodes: true } },
        filecoinNode: true,
        certificate: true,
      }
    });

    if (!purchase) {
      return null;
    }

    const redemptionStatement = await this.getRedemptionStatement(purchase.certificate.batchId.toString());
    const attestation = purchase.attestationId ? await this.filesService.findOne(purchase.attestationId) : undefined;

    return FullPurchaseDto.toDto({
      ...purchase,
      files: {
        redemptionStatement: {
          ...redemptionStatement,
          url: `${process.env.FILES_BASE_URL}/${redemptionStatement.id}`
        },
        attestation: purchase.attestationId
          ? {
            ...attestation,
            url: `${process.env.FILES_BASE_URL}/${attestation.id}`
          }
          : undefined
      }
    });
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    const existingRecord = await this.prisma.purchase.findUnique({ where: { id } });

    if (!existingRecord) {
      throw new NotFoundException();
    }

    return await this.prisma.$transaction(async (prisma) => {
      await this.prisma.purchase.update({
        where: { id },
        data: {
          ...updatePurchaseDto,
          recsSoldWh: BigInt(updatePurchaseDto.recsSoldWh) ?? undefined
        }
      });

      const data = await prisma.purchase.findUnique({
        where: { id },
        include: { filecoinNode: true }
      });

      return data;
    });
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.$transaction([
      this.prisma.purchase.delete({ where: { id } })
    ]);

    return true;
  }

  async createAttestationForPurchases(ids: string[]): Promise<FileMetadataDto[]> {
    this.logger.debug(`Generating an attestation for purchases ${ids.join(', ')}`);

    const fileDtos: FileMetadataDto[] = [];

    await this.prisma.$transaction(async (prisma) => {
      for (const id of ids) {
        const savedPurchase = await prisma.purchase.findUnique({
          where: { id },
          include: {
            certificate: true,
            filecoinNode: true,
          }
        });
  
        if (savedPurchase.attestationId) {
          throw new ConflictException(`Attestation already exists for purchase ${savedPurchase.id}`);
        }
        
        const pdfGenerationData = {
          locals: {
            minerId: savedPurchase.filecoinNodeId,
            orderQuantity: BigNumber.from(savedPurchase.recsSoldWh).div(1e6).toString(),
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
        };

        const fileBuffer = await firstValueFrom(this.pdfService.toBuffer('attestation', pdfGenerationData));  
        const fileDto = await this.filesService.create(`Zero_EAC-Attestation_${id}.pdf`, fileBuffer);

        await prisma.purchase.update({
          where: {
            id: savedPurchase.id
          }, 
          data: {
            attestationId: fileDto.id
          }
        });
  
        fileDtos.push(fileDto);
      }
    }, { timeout: this.configService.get('PG_TRANSACTION_TIMEOUT') }).catch((err) => {
      this.logger.error('rolling back transaction');
      throw err;
    });

    return fileDtos;
  }

  private async getRedemptionStatement(batchId: string): Promise<FileMetadataDto> {
    const batch = await this.batchService.findOne(batchId.toString());
    return await this.filesService.findOne(batch.redemptionStatementId);
  }

  async getChainEvents(id: string): Promise<PurchaseEventDTO[]> {
    const purchase = await this.prisma.purchase.findUnique({
      where: { id },
      include: {
        seller: true,
        buyer: true
      }
    });

    if (!purchase) {
      throw new NotFoundException(`${id} purchase not found`);
    }

    const certificate = await this.prisma.certificate.findUnique({ where: { id: purchase.certificateId } });

    if (!certificate) {
      throw new NotFoundException(`${purchase.certificateId} certificate not found`);
    }

    const events = await this.issuerService.getCertificateEvents(certificate.onchainId.toString());

    return events.filter(
      event => (
        event.to === purchase.buyer.blockchainAddress
          && BigNumber.from(event.value).eq(purchase.recsSoldWh)
        ) || event.from === constants.AddressZero
    ).map((event) => ({
      timestamp: event.timestamp,
      txHash: event.txHash,
      blockHash: event.blockHash,
      from: event.from,
      to: event.to,
      recs: event.value ? BigInt(event.value).toString() : undefined,
      type: event.eventType,
      date: new Date(event.timestamp * 1e3)
    }));
  }
}
