import { Injectable, Logger } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellerDto } from './dto/seller.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IssuerService } from '../issuer/issuer.service';
import { Seller } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SellersService {
  private readonly logger = new Logger(SellersService.name, { timestamp: true });

  constructor(
    private prisma: PrismaService,
    private issuerService: IssuerService,
    private readonly configService: ConfigService
  ) {}

  async create(createSellerDto: CreateSellerDto): Promise<SellerDto> {
    let newSeller: Seller;

    await this.prisma.$transaction(async (prisma) => {
      try {
        newSeller = await prisma.seller.create({ data: createSellerDto });
        this.logger.debug(`created a new seller instance: ${newSeller.id}`);
      } catch (err) {
        this.logger.error(`error creating a new seller: ${err}`);
        throw err;
      }

      let blockchainAddress: string;

      try {
        blockchainAddress = (await this.issuerService.getAccount()).blockchainAddress;
        this.logger.debug(`gathered blockchainAddress: ${blockchainAddress} for ${newSeller.id}`);
      } catch (err) {
        this.logger.error(`error gathering blockchain account: ${err}`);
        throw err;
      }

      try {
        await prisma.seller.update({
          data: { blockchainAddress },
          where: { id: newSeller.id }
        });
      } catch (err) {
        this.logger.error(`error setting blockchain address for seller ${newSeller.id}: ${err}`);
        throw err;
      }
    }, { timeout: this.configService.get('PG_TRANSACTION_TIMEOUT') }).catch((err) => {
      this.logger.error('rolling back transaction');
      throw err;
    });

    return new SellerDto(await this.prisma.seller.findUnique({ where: { id: newSeller.id } }));
  }

  async findAll(): Promise<SellerDto[]> {
    return (await this.prisma.seller.findMany()).map(r => new SellerDto(r));
  }

  async findOne(id: string): Promise<SellerDto> {
    const row = await this.prisma.seller.findUnique({ where: { id } });

    if (!row) {
      return null;
    }

    return new SellerDto(row);
  }

  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<SellerDto> {
    return new SellerDto(await this.prisma.seller.update({
      where: { id },
      data: updateSellerDto
    }));
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.seller.delete({ where: { id } });

    return true;
  }
}
