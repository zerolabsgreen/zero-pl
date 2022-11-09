import crypto from 'crypto';
import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BatchDto } from './dto/batch.dto';
import { CertificateIds, IssuerService } from '../issuer/issuer.service';
import { Batch } from '@prisma/client';
import { FilesService } from '../files/files.service';
import { CertificatesService } from '../certificates/certificates.service';
import { SellersService } from '../sellers/sellers.service';
import { MintDTO } from '../issuer/issuer.service';
import { dateTimeToUnix } from '../utils/unix';
import { ConfigService } from '@nestjs/config';
import { toDateTimeWithOffset } from '../utils/date';
import { PaginatedDto } from '../utils/paginated.dto';
import { BigNumber, utils } from 'ethers';
import { TxHash } from '../utils/types';
import axios from 'axios';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name, { timestamp: true });

  constructor(
    private prisma: PrismaService,
    private issuerService: IssuerService,
    private filesService: FilesService,
    private certificatesService: CertificatesService,
    private sellersService: SellersService,
    private readonly configService: ConfigService
  ) {}

  async create(onchainBatchId: string): Promise<BatchDto> {
    this.logger.log(`received a request to create a batch ${onchainBatchId}...`);

    let newBatch: Batch;

    try {
      newBatch = await this.prisma.batch.create(
        { data: { id: onchainBatchId } }
      );
      this.logger.debug(`created a new batch with ID ${onchainBatchId}`);
    } catch (err) {
      this.logger.error(`error creating a new batch: ${err.message}`);
      throw err;
    };

    const dbRecord = await this.prisma.batch.findUniqueOrThrow({
      where: { id: newBatch.id },
      include: {
        certificates: true
      }
    });

    return BatchDto.toDto(dbRecord);
  }

  async findAll(query?: {
    skip?: number;
    take?: number;
  }): Promise<PaginatedDto<BatchDto>> {
    const total = await this.prisma.batch.count();

    const take = query?.take || total;
    const skip = query?.skip || 0;

    const batches = (await this.prisma.batch.findMany({
      skip,
      take,
      include: {
        certificates: true
      }
    })).map((dbRecord) => BatchDto.toDto(dbRecord));

    return {
      data: batches,
      total,
      count: batches.length
    };
  }

  async findOne(id: string): Promise<BatchDto | null> {
    const dbRecord = await this.prisma.batch.findUniqueOrThrow({
      where: { id },
      include: {
        certificates: true
      }
    });

    return BatchDto.toDto(dbRecord);
  }

  async setRedemptionStatement(
    batchId: string,
    redemptionStatementId: string,
    totalVolume: string
  ): Promise<TxHash> {
    if (!redemptionStatementId) {
      throw new NotFoundException(`Please provide a valid redemption statement ID. Got: ${redemptionStatementId}`);
    }

    const batch = await this.findOne(batchId);

    if (batch.redemptionStatementId) {
      throw new ConflictException(`Batch ${batchId} already has a redemption statement set.`);
    }

    const alreadySetToSomeBatch = await this.prisma.batch.findMany({
      where: {
        redemptionStatementId: redemptionStatementId
      }
    });

    if (alreadySetToSomeBatch.length > 0) {
      throw new ConflictException(`Redemption statement ${redemptionStatementId} already set for a batch.`);
    }

    const txHash = await this.setRedemptionStatementOnChain(batch.id, redemptionStatementId);

    await this.prisma.batch.update({
      data: {
        redemptionStatementId: redemptionStatementId,
        totalVolume: BigInt(totalVolume)
      },
      where: { id: batch.id }
    });

    return txHash;
  }

  private async setRedemptionStatementOnChain(onChainBatchId: string, redemptionStatementId: string): Promise<string> {
    let redemptionStatement: any;

    try {
      redemptionStatement = (await axios.get(
        `https://ipfs.io/ipfs/${redemptionStatementId}`,
        { responseType: 'blob' }
      )).data;

      console.log({
        onChainBatchId,
        redemptionStatementId,
        redemptionStatement
      })
    } catch (e) {
      if (e.response?.status === 404) {
        throw new NotFoundException(`Redemption statement ${redemptionStatementId} does not exist on IPFS.`);
      }

      throw new PreconditionFailedException(e.message);
    }

    const hashSum = crypto.createHash('sha256');
    hashSum.update(redemptionStatement);

    const hex = hashSum.digest('hex');

    return await this.issuerService.setRedemptionStatement(onChainBatchId, {
      value: `0x${hex}`,
      storagePointer: `ipfs://${redemptionStatementId}`,
    });
  }

  async mint(
    batchId: string,
    certificateIds: string[]
  ): Promise<TxHash> {
    const batch = await this.findOne(batchId);

    const certificates = await this.certificatesService.find(certificateIds);

    if (certificates.length !== certificateIds.length) {
      throw new BadRequestException(`Non-existing Certificate ID in array`);
    }

    const totalCertificateVolume = certificates.reduce(
      (partialSum, cert) => partialSum.add(cert.energyWh), BigNumber.from(0)
    );

    // TODO: Also check if some certificates have already been minted and account for those
    if (totalCertificateVolume.gt(batch.totalVolume)) {
      throw new BadRequestException(`Batch totalVolume=${batch.totalVolume} but trying to mint ${totalCertificateVolume.toString()} Wh`);
    }

    const mintingData = await Promise.all(certificates.map(async (c): Promise<MintDTO> => {
      const seller = await this.sellersService.findOne(c.initialSellerId);

      return {
        to: seller.blockchainAddress,
        amount: c.energyWh,
        certificate: {
          generationStartTime: dateTimeToUnix(
            toDateTimeWithOffset(
              c.generationStart.toISOString(),
              c.generationStartTimezoneOffset ?? 0
            )
          ),
          generationEndTime: dateTimeToUnix(
            toDateTimeWithOffset(
              c.generationEnd.toISOString(),
              c.generationEndTimezoneOffset ?? 0
            )
          ),
          productType: c.productType,
          generator: {
            id: c.generatorId,
            name: c.generatorName,
            energySource: c.energySource,
            region: c.region ?? '',
            country: c.country,
            commissioningDate: c.commissioningDate ? dateTimeToUnix(
              toDateTimeWithOffset(
                c.commissioningDate.toISOString(),
                c.commissioningDateTimezoneOffset ?? 0
              )
            ) : 0,
            capacity: c.nameplateCapacityW?.toString() ?? '0',
          },
        },
        data: utils.defaultAbiCoder.encode(['string'], [c.id]),
      };
    }));

    const txHash = await this.issuerService.mint(
      batch.id,
      mintingData
    );

    await this.prisma.$transaction(async (prisma) => {
      await prisma.batch.update({
        data: {
          certificates: {
            connect: certificateIds.map(id => ({ id}))
          }
        },
        where: { id: batch.id }
      });

      for (let i = 0; i < certificateIds.length; i++) {
        await prisma.certificate.update({
          data: {
            batchId: batch.id,
            txHash
          },
          where: {
            id: certificateIds[i]
          }
        });
      }
    }, { timeout: this.configService.get('PG_TRANSACTION_TIMEOUT') }).catch((err) => {
      this.logger.error('rolling back transaction');
      throw err;
    });

    return txHash;
  }

  async attachCerts(
    txHash: TxHash,
  ): Promise<CertificateIds[]> {
    const ids = await this.issuerService.getCertificatesMintedIn(txHash);

    for (const { onchainId, certificateId } of ids) {
      await this.prisma.certificate.update({
        data: {
          onchainId: BigInt(onchainId)
        },
        where: {
          id: certificateId
        }
      });
    }

    return ids;
  }
}
