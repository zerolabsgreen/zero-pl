import { Injectable, Logger } from '@nestjs/common';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { BuyerDto } from './dto/buyer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FilecoinNodeDto } from '../filecoin-nodes/dto/filecoin-node.dto';
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

  async create(createBuyerDto: CreateBuyerDto) {
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

      // TODO: Re-enable with a proper setup for creating blockchain accounts

      // let blockchainAddress: string;

      // try {
      //   blockchainAddress = (await this.issuerService.getAccount()).blockchainAddress;
      //   this.logger.debug(`gathered blockchainAddress: ${blockchainAddress} for buyer (${newBuyer.id})`);
      // } catch (err) {
      //   this.logger.error(`error gathering blockchain account: ${err}`);
      //   throw err;
      // }

      // try {
      //   await prisma.buyer.update({
      //     data: { blockchainAddress },
      //     where: { id: newBuyer.id }
      //   });
      // } catch (err) {
      //   this.logger.error(`error setting blockchain address for buyer ${newBuyer.id}: ${err}`);
      //   throw err;
      // }

    }, { timeout: this.configService.get('PG_TRANSACTION_TIMEOUT') }).catch((err) => {
      this.logger.error('rolling back transaction');
      throw err;
    });

    return new BuyerDto(await this.prisma.buyer.findUnique({ where: { id: newBuyer.id } }));
  }

  async findAll() {
    return (await this.prisma.buyer.findMany()).map((r) => new BuyerDto(r));
  }

  async findOne(id: string) {
    const row = await this.prisma.buyer.findUnique({
      where: { id },
      include: { filecoinNodes: true }
    });

    if (!row) {
      return null;
    }

    return new BuyerDto({ ...row, filecoinNodes: row.filecoinNodes.map((r) => new FilecoinNodeDto(r)) });
  }

  async update(id: string, updateBuyerDto: UpdateBuyerDto) {
    return new BuyerDto(await this.prisma.buyer.update({ where: { id }, data: updateBuyerDto }));
  }

  async remove(id: string) {
    return new BuyerDto(await this.prisma.buyer.delete({ where: { id } }));
  }
}
