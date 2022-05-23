import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { BuyerDto } from './dto/buyer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IssuerService } from '../issuer/issuer.service';
import { Buyer } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BuyersService {
  private readonly logger = new Logger(BuyersService.name, { timestamp: true });

  constructor(
    private prisma: PrismaService,
    private issuerService: IssuerService,
    private readonly configService: ConfigService
  ) {}

  async create(createBuyerDto: CreateBuyerDto): Promise<BuyerDto> {
    let newBuyer: Buyer;

    this.logger.debug(`payload: ${JSON.stringify(createBuyerDto)}`);

    await this.prisma.$transaction(async (prisma) => {
      try {
        newBuyer = await prisma.buyer.create({ data: createBuyerDto });
        this.logger.debug(`created a new buyer instance: ${newBuyer.id}`);
      } catch (err) {
        this.logger.error(`error creating a new buyer: ${err}`);
        throw err;
      }

      await this.assignBlockchainAccount(newBuyer.id);
    }, { timeout: this.configService.get('PG_TRANSACTION_TIMEOUT') }).catch((err) => {
      this.logger.error('rolling back transaction');
      throw err;
    });

    return new BuyerDto(await this.prisma.buyer.findUnique({ where: { id: newBuyer.id } }));
  }

  async findAll(): Promise<BuyerDto[]> {
    return (await this.prisma.buyer.findMany(
      {
        include: {
          filecoinNodes: true
        } 
      })).map((r) => BuyerDto.toDto(r));
  }

  async findOne(id: string): Promise<BuyerDto> {
    const row = await this.prisma.buyer.findUnique({
      where: { id },
      include: { filecoinNodes: true }
    });

    if (!row) {
      return null;
    }

    return BuyerDto.toDto(row);
  }

  async update(id: string, updateBuyerDto: UpdateBuyerDto): Promise<BuyerDto> {
    const updated = await this.prisma.buyer.update({ where: { id }, data: updateBuyerDto, include: { filecoinNodes: true } });
    return BuyerDto.toDto(updated);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.buyer.delete({ where: { id } });

    return true;
  }

  async assignBlockchainAccount(id: string): Promise<Buyer> {
    const buyer = await this.findOne(id);

    if (buyer.blockchainAddress) {
      throw new ConflictException(`Buyer ${id} already has a blockchain address attached`);
    }

    let blockchainAddress: string;

    try {
      blockchainAddress = (await this.issuerService.getAccount()).blockchainAddress;
      this.logger.debug(`gathered blockchainAddress: ${blockchainAddress} for buyer (${id})`);
    } catch (err) {
      this.logger.error(`error gathering blockchain account: ${err}`);
      throw err;
    }

    try {
      return await this.prisma.buyer.update({
        data: { blockchainAddress },
        where: { id }
      });
    } catch (err) {
      this.logger.error(`error setting blockchain address for buyer ${id}: ${err}`);
      throw err;
    }
  }
}
