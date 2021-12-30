import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CertificateDto } from './dto/certificate.dto';
import { IssuerService } from '../issuer/issuer.service';
import { Certificate } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CertificatesService {
  private readonly logger = new Logger(CertificatesService.name, { timestamp: true });

  constructor(
    private prisma: PrismaService,
    private issuerService: IssuerService,
    private readonly configService: ConfigService
  ) {}

  async create(createCertificateDto: CreateCertificateDto) {
    this.logger.log(`received request to create a certificate: ${JSON.stringify(createCertificateDto)}`);
    let newCertificate: Certificate;

    const { energy, ...newCertificateData } = createCertificateDto;

    if (!(await this.prisma.seller.findUnique({ where: { id: newCertificateData.initialSellerId } }))) {
      this.logger.warn(`attempt to create a certificate for non-existing sellerId=${newCertificateData.initialSellerId}`);
      throw new NotFoundException(`sellerId=${newCertificateData.initialSellerId} not found`);
    }

    await this.prisma.$transaction(async (prisma) => {
      try {
        newCertificate = await prisma.certificate.create({ data: newCertificateData });
        this.logger.debug(`created a new certificate: ${JSON.stringify(newCertificate, (k, v) => typeof v === 'bigint' ? v.toString() : v)}`);
      } catch (err) {
        this.logger.error(`error creating a new certificate: ${err}`);
        throw err;
      }

      const seller = await this.prisma.seller.findUnique({ where: { id: createCertificateDto.initialSellerId } });

      let txHash: string;

      try {
        ({ txHash } = await this.issuerService.issueCertificate({
          toSeller: seller.blockchainAddress,
          deviceId: createCertificateDto.generatorId,
          energy,
          fromTime: new Date(createCertificateDto.generationStart),
          toTime: new Date(createCertificateDto.generationEnd)
        }));

        this.logger.debug(`issued a new certificate on chain: txHash=${txHash}`);
      } catch (err) {
        this.logger.error(`error issuing a new certificate on chain: ${err}`);
        throw err;
      }

      try {
        await prisma.certificate.update({
          data: { txHash },
          where: { id: newCertificate.id }
        });

        this.logger.debug(`set transaction hash for the certificate: ${newCertificate.id}`);
      } catch (err) {
        this.logger.error(`error setting transaction hash for the certificate: ${newCertificate.id}: ${err}`);
        throw err;
      }
    }, { timeout: this.configService.get('PG_TRANSACTION_TIMEOUT') }).catch((err) => {
      this.logger.error('rolling back transaction');
      throw err;
    });

    // TODO: we need criteria to know it is possible to go to a next cert. issuance

    const dbRecord = await this.prisma.certificate.findUnique({ where: { id: newCertificate.id } });

    return new CertificateDto({
      ...dbRecord,
      generationStart: dbRecord.generationStart.toISOString(),
      generationEnd: dbRecord.generationEnd.toISOString()
    });
  }

  async findAll() {
    return (await this.prisma.certificate.findMany()).map((dbRecord) => new CertificateDto({
      ...dbRecord,
      generationStart: dbRecord.generationStart.toISOString(),
      generationEnd: dbRecord.generationEnd.toISOString()
    }));
  }

  async findOne(id: string): Promise<CertificateDto | null> {
    const dbRecord = await this.prisma.certificate.findUnique({
      where: { id },
      rejectOnNotFound: () => new NotFoundException(`certificateId=${id} not found`)
    });

    return new CertificateDto({
      ...dbRecord,
      generationStart: dbRecord.generationStart.toISOString(),
      generationEnd: dbRecord.generationEnd.toISOString()
    });
  }

  async update(id: string, updateCertificateDto: UpdateCertificateDto) {
    const dbRecord = await this.prisma.certificate.update({ where: { id }, data: updateCertificateDto });

    return new CertificateDto({
      ...dbRecord,
      generationStart: dbRecord.generationStart.toISOString(),
      generationEnd: dbRecord.generationEnd.toISOString()
    });
  }

  remove(id: string) {
    return `This action removes a #${id} certificate`;
  }
}
