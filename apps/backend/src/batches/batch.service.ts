import crypto from 'crypto';
import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BatchDto } from './dto/batch.dto';
import { IssuerService } from '../issuer/issuer.service';
import { Batch, ProductEnumType } from '@prisma/client';
import { FilesService } from '../files/files.service';
import { CertificatesService } from '../certificates/certificates.service';
import { SellersService } from '../sellers/sellers.service';
import { MintDTO } from '../issuer/issuer.service';
import { dateToUnix } from '../utils/unix';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name, { timestamp: true });

  constructor(
    private prisma: PrismaService,
    private issuerService: IssuerService,
    private filesService: FilesService,
    private certificatesService: CertificatesService,
    private sellersService: SellersService
  ) {}

  async create(batchDto: BatchDto): Promise<BatchDto> {
    this.logger.log(`received request to create a redemption statement: ${JSON.stringify(batchDto)}`);
  
    let newBatch: Batch;

    try {
      newBatch = await this.prisma.batch.create(
        { data: { ...batchDto, onchainId: BigInt(batchDto.onchainId) } }
      );
      this.logger.debug(`created a new redemption statement: ${JSON.stringify(batchDto)}`);
    } catch (err) {
      this.logger.error(`error creating a new redemption statement: ${err}`);
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
      where: { id },
      include: {
        certificates: true
      },
      rejectOnNotFound: () => new NotFoundException(`batchId=${id} not found`)
    });

    return BatchDto.toDto(dbRecord);
  }

  async setRedemptionStatement(batchId: string, redemptionStatementFileId: string): Promise<void> {
    const batch = await this.findOne(batchId);

    if (batch.redemptionStatementId) {
      throw new ConflictException(`Batch ${batchId} already has a redemption statement set.`);
    }

    if (!batch.onchainId) {
      throw new PreconditionFailedException(`Batch ${batchId} doesn't have an on-chain ID. Please create one.`);
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
      where: { id: batch.id }
    });

    await this.setRedemptionStatementOnChain(batch.id, redemptionStatement.id);
  }

  private async setRedemptionStatementOnChain(onChainBatchId: string, redemptionStatementId: string) {
    const redemptionStatement = await this.filesService.findOne(redemptionStatementId);

    const hashSum = crypto.createHash('sha256');
    hashSum.update(redemptionStatement.content);

    const hex = hashSum.digest('hex');

    await this.issuerService.setRedemptionStatement(Number(onChainBatchId), {
      value: hex,
      storagePointer: `/api/files/${redemptionStatementId}`,
    });
  }

  async generateOnChainId(batchId: string): Promise<number> {
    const batch = await this.findOne(batchId);

    let onchainId: number;

    try {
      onchainId = await this.issuerService.createBatch();

      this.logger.debug(`create a new on-chain batch with ID ${onchainId}`);
    } catch (err) {
      this.logger.error(`error creating a new batch on chain: ${err}`);
      throw err;
    }

    try {
      await this.prisma.batch.update({
        data: { onchainId },
        where: { id: batch.id }
      });

      this.logger.debug(`Assigned on-chain ID ${onchainId} to batch ${batch.id}`);
    } catch (err) {
      this.logger.error(`error assigning on-chain ID ${onchainId} to batch ${batch.id}: ${err}`);
      throw err;
    }

    return onchainId;
  }
  
  async mint(
    batchId: string,
    certificateIds: string[]
  ): Promise<string> {
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
          generationStartTime: dateToUnix(c.generationStart), // TODO: Add timezone
          generationEndTime: dateToUnix(c.generationEnd), // TODO: Add timezone
          productType: c.productType,
          generator: {
            id: c.generatorId,
            name: c.generatorName,
            energySource: c.energySource,
            region: c.region,
            country: c.country,
            commissioningDate: dateToUnix(c.commissioningDate), // TODO: Add timezone
            capacity: c.nameplateCapacityW.toString(),
          },
        },
        data: '',
      };
    }));

    return await this.issuerService.mint(
      Number(batch.onchainId), 
      mintingData
    );
  }
}
