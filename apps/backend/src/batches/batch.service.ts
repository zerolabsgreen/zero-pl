import crypto from 'crypto';
import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BatchDto } from './dto/batch.dto';
import { IssuerService } from '../issuer/issuer.service';
import { Batch } from '@prisma/client';
import { FilesService } from '../files/files.service';
import { CertificatesService } from '../certificates/certificates.service';
import { SellersService } from '../sellers/sellers.service';
import { MintDTO } from '../issuer/issuer.service';
import { dateToUnix } from '../utils/unix';
import { ConfigService } from '@nestjs/config';

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

  async create(): Promise<BatchDto> {
    this.logger.log(`received a request to create a batch...`);

    const onchainId = await this.generateOnChainId();
  
    let newBatch: Batch;

    try {
      newBatch = await this.prisma.batch.create(
        { data: { id: onchainId } }
      );
      this.logger.debug(`created a new batch with ID ${onchainId}`);
    } catch (err) {
      this.logger.error(`error creating a new batch: ${err.message}`);
      throw err;
    };

    const dbRecord = await this.prisma.batch.findUnique({
      where: { id: newBatch.id },
      include: {
        certificates: true
      },
      rejectOnNotFound: () => new NotFoundException(`batchId=${newBatch.id} not found`)
    });

    return BatchDto.toDto(dbRecord);
  }

  async findAll(): Promise<BatchDto[]> {
    return (await this.prisma.batch.findMany({
      include: {
        certificates: true
      }
    })).map((dbRecord) => BatchDto.toDto(dbRecord));
  }

  async findOne(id: string): Promise<BatchDto | null> {
    const dbRecord = await this.prisma.batch.findUnique({
      where: { id: BigInt(id) },
      include: {
        certificates: true
      },
      rejectOnNotFound: () => new NotFoundException(`batchId=${id} not found`)
    });

    return BatchDto.toDto(dbRecord);
  }

  async setRedemptionStatement(batchId: string, redemptionStatementFileId: string): Promise<string> {
    if (!redemptionStatementFileId) {
      throw new NotFoundException(`Please provide a valid redemption statement ID. Got: ${redemptionStatementFileId}`);
    }

    const batch = await this.findOne(batchId);

    if (batch.redemptionStatementId) {
      throw new ConflictException(`Batch ${batchId} already has a redemption statement set.`);
    }

    const alreadySetToSomeBatch = await this.prisma.batch.findMany({ 
      where: {
        redemptionStatementId: redemptionStatementFileId
      }
    });

    if (alreadySetToSomeBatch.length > 0) {
      throw new ConflictException(`Redemption statement ${redemptionStatementFileId} already set for a batch.`);
    }

    const redemptionStatement = await this.filesService.findOne(redemptionStatementFileId);

    await this.prisma.batch.update({
      data: { redemptionStatementId: redemptionStatement.id },
      where: { id: BigInt(batch.id) }
    });

    const txHash = await this.setRedemptionStatementOnChain(batch.id, redemptionStatement.id);

    return txHash;
  }

  private async setRedemptionStatementOnChain(onChainBatchId: string, redemptionStatementId: string): Promise<string> {
    const redemptionStatement = await this.filesService.findOne(redemptionStatementId);

    const hashSum = crypto.createHash('sha256');
    hashSum.update(redemptionStatement.content);

    const hex = hashSum.digest('hex');
    
    return await this.issuerService.setRedemptionStatement(Number(onChainBatchId), {
      value: hex,
      storagePointer: `/api/files/${redemptionStatementId}`,
    });
  }

  async generateOnChainId(): Promise<number> {
    let onchainId: number;

    try {
      onchainId = await this.issuerService.createBatch();

      this.logger.debug(`created a new on-chain batch with ID ${onchainId}`);
    } catch (err) {
      this.logger.error(`error creating a new batch on chain: ${err.message}`);
      throw err;
    }

    return onchainId;
  }
  
  async mint(
    batchId: string,
    certificateIds: string[]
  ): Promise<number[]> {
    const batch = await this.findOne(batchId);

    const certificates = await this.certificatesService.find(certificateIds);
    
    if (certificates.length !== certificateIds.length) {
      throw new BadRequestException(`Non-existing Certificate ID in array`);
    }

    const mintingData = await Promise.all(certificates.map(async (c): Promise<MintDTO> => {
      const seller = await this.sellersService.findOne(c.initialSellerId);

      return {
        to: seller.blockchainAddress,
        amount: c.energyWh,
        certificate: {
          generationStartTime: dateToUnix(new Date(c.generationStart)), // TODO: Add timezone
          generationEndTime: dateToUnix(new Date(c.generationEnd)), // TODO: Add timezone
          productType: c.productType,
          generator: {
            id: c.generatorId,
            name: c.generatorName,
            energySource: c.energySource,
            region: c.region,
            country: c.country,
            commissioningDate: dateToUnix(new Date(c.commissioningDate)), // TODO: Add timezone
            capacity: c.nameplateCapacityW.toString(),
          },
        },
        data: '0x',
      };
    }));

    const onchainCertificateIds = await this.issuerService.mint(
      Number(batch.id), 
      mintingData
    );

    await this.prisma.$transaction(async (prisma) => {
      await prisma.batch.update({
        data: { 
          certificates: {
            connect: certificateIds.map(id => ({ id}))
          }
        },
        where: { id: BigInt(batch.id) }
      });

      for (let i = 0; i < certificateIds.length; i++) {
        await prisma.certificate.update({
          data: {
            onchainId: BigInt(onchainCertificateIds[i])
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

    return onchainCertificateIds; 
  }
}
