import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellerDto } from './dto/seller.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IssuerService } from '../issuer/issuer.service';
import { Seller } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PaginatedDto } from '../utils/paginated.dto';

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
      await this.assignBlockchainAccount(newSeller.id, prisma);
    }, { timeout: this.configService.get('PG_TRANSACTION_TIMEOUT') }).catch((err) => {
      this.logger.error('rolling back transaction');
      throw err;
    });

    return new SellerDto(await this.prisma.seller.findUnique({ where: { id: newSeller.id } }));
  }

  async findByName(name: string): Promise<SellerDto> {
    const [ row ] = await this.prisma.seller.findMany({ where: { name } });

    if (!row) {
      return null;
    }

    return new SellerDto(row);
  }

  async findAll(query?: {
    skip?: number;
    take?: number;
  }): Promise<PaginatedDto<SellerDto>> {
    const total = await this.prisma.seller.count();

    const take = query?.take || total;
    const skip = query?.skip || 0;

    const sellers = (await this.prisma.seller.findMany({
      skip,
      take
    })).map(r => new SellerDto(r));

    return {
      data: sellers,
      total,
      count: sellers.length
    };
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

  async assignBlockchainAccount(id: string, prismaClient?: any): Promise<Seller> {
    const prisma = prismaClient ?? this.prisma;
    const seller = await prisma.seller.findUnique({ where: { id } });

    if (seller.blockchainAddress) {
      throw new ConflictException(`Seller ${id} already has a blockchain address attached`);
    }

    let blockchainAddress: string;

    try {
      blockchainAddress = (await this.issuerService.getAccount()).blockchainAddress;
      this.logger.debug(`gathered blockchainAddress: ${blockchainAddress} for seller (${id})`);
    } catch (err) {
      this.logger.error(`error gathering blockchain account: ${err}`);
      throw err;
    }

    try {
      return await prisma.seller.update({
        data: { blockchainAddress },
        where: { id }
      });
    } catch (err) {
      this.logger.error(`error setting blockchain address for buyer ${id}: ${err}`);
      throw err;
    }
  }
}
