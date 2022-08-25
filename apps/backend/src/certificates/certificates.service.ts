import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CertificateDto } from './dto/certificate.dto';
import { Certificate } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PaginatedDto } from '../utils/paginated.dto';
import { CertificateWithPurchasesDto } from './dto/certificate-with-purchases.dto';

@Injectable()
export class CertificatesService {
  private readonly logger = new Logger(CertificatesService.name, { timestamp: true });

  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async create(createCertificateDtos: CreateCertificateDto[]): Promise<CertificateDto[]> {
    this.logger.log(`received request to create a certificates: ${JSON.stringify(createCertificateDtos)}`);

    const certificates: CertificateDto[] = [];
  
    await this.prisma.$transaction(async (prisma) => {
      for (const createCertificateDto of createCertificateDtos) {
        let newCertificate: Certificate;

        const { onchainId, batchId, initialSellerId, energyWh, nameplateCapacityW, ...newCertificateData } = createCertificateDto;

        if (!(await this.prisma.seller.findUnique({ where: { id: initialSellerId } }))) {
          this.logger.warn(`attempt to create a certificate for non-existing sellerId=${initialSellerId}`);
          throw new NotFoundException(`sellerId=${initialSellerId} not found`);
        }

        try {
          newCertificate = await prisma.certificate.create({ data: {
            ...newCertificateData,
            energyWh: BigInt(energyWh),
            nameplateCapacityW,
            onchainId: onchainId ? BigInt(onchainId) : undefined,
            seller: { connect: { id: initialSellerId } },
            batch: batchId ? { connect: { id: batchId }} : undefined
          }});
          this.logger.debug(`created a new certificate: ${JSON.stringify(newCertificate, (k, v) => typeof v === 'bigint' ? v.toString() : v)}`);
        } catch (err) {
          this.logger.error(`error creating a new certificate: ${err}`);
          throw err;
        }

        // TODO: we need criteria to know it is possible to go to a next cert. issuance

        certificates.push(CertificateDto.toDto(newCertificate));
      }
    }, { timeout: this.configService.get('PG_TRANSACTION_TIMEOUT') }).catch((err) => {
      this.logger.error('rolling back transaction');
      throw err;
    });

    return certificates;
  }

  async findAll(query?: {
    skip?: number;
    take?: number;
  }): Promise<PaginatedDto<CertificateDto>> {
    const total = await this.prisma.certificate.count();

    const take = query?.take || total;
    const skip = query?.skip || 0;

    const certificates =  (await this.prisma.certificate.findMany({
      skip,
      take
    })).map((dbRecord) => CertificateDto.toDto(dbRecord));

    return {
      data: certificates,
      total,
      count: certificates.length
    };
  }

  async find(certificateIds: string[]): Promise<CertificateDto[]> {
    return (await this.prisma.certificate.findMany({
      where: {
        id: { in: certificateIds },
      },
    })).map((dbRecord) => CertificateDto.toDto(dbRecord));
  }

  async findOne(id: string): Promise<CertificateDto | null> {
    const dbRecord = await this.prisma.certificate.findUnique({
      where: { id },
      rejectOnNotFound: () => new NotFoundException(`certificateId=${id} not found`)
    });

    return CertificateDto.toDto(dbRecord);
  }

  async findOneWithPurchases(id: string): Promise<CertificateWithPurchasesDto> {
    const dbRecord = await this.prisma.certificate.findUnique({
      where: { id },
      include: {
        purchase: true
      },
      rejectOnNotFound: () => new NotFoundException(`certificateId=${id} not found`)
    });

    return CertificateWithPurchasesDto.toDto(dbRecord);
  }

  async update(id: string, updateCertificateDto: UpdateCertificateDto): Promise<CertificateDto> {
    const dbRecord = await this.prisma.certificate.update({ where: { id }, data : CertificateDto.toDbEntity(updateCertificateDto) });
    return CertificateDto.toDto(dbRecord);
  }

  remove(id: string) {
    return `This action removes a #${id} certificate`;
  }
}
