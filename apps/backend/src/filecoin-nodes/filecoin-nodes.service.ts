import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateFilecoinNodeDto } from './dto/create-filecoin-node.dto';
import { UpdateFilecoinNodeDto } from './dto/update-filecoin-node.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FilecoinNodeDto } from './dto/filecoin-node.dto';
import { FilecoinNode, FileType } from '@prisma/client';
import { pick } from 'lodash';
import { DateTime, Duration } from "luxon";
import { BigNumber } from 'ethers';
import { FilecoinNodeWithContractsDto } from './dto/filecoin-node-with-contracts.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class FilecoinNodesService {
  private readonly logger = new Logger(FilecoinNodesService.name, { timestamp: true });

  constructor(private prisma: PrismaService, private filesService: FilesService) {}

  async create(createFilecoinNodeDto: CreateFilecoinNodeDto): Promise<FilecoinNodeDto> {
    let newFilecoinNode: FilecoinNode;
    await this.prisma.$transaction(async (prisma) => {
      try {
        newFilecoinNode = await prisma.filecoinNode.create({ data: createFilecoinNodeDto });
      } catch (err) {
        this.logger.error(`error creating a new filecoin node: ${err}`);
        throw err;
      }

      // TODO: Re-enable with a proper setup for creating blockchain accounts

      // let blockchainAddress: string;

      // try {
      //   blockchainAddress = (await this.issuerService.getAccount()).blockchainAddress;
      //   this.logger.debug(`gathered blockchainAddress: ${blockchainAddress} for filecoin node (${newFilecoinNode.id})`);
      // } catch (err) {
      //   this.logger.error(`error gathering blockchain account: ${err}`);
      //   throw err;
      // }

      // try {
      //   await prisma.filecoinNode.update({
      //     data: { blockchainAddress },
      //     where: { id: newFilecoinNode.id }
      //   });
      // } catch (err) {
      //   this.logger.error(`error setting blockchain address for buyer ${newFilecoinNode.id}: ${err}`);
      //   throw err;
      // }

    }, { timeout: 60000 }).catch((err) => {
      this.logger.error('rolling back transaction');
      throw err;
    });

    return new FilecoinNodeDto(newFilecoinNode);
  }

  async findAll(): Promise<FilecoinNodeDto[]> {
    return (await this.prisma.filecoinNode.findMany()).map((r) => new FilecoinNodeDto(r));
  }

  async findOne(id: string): Promise<FilecoinNodeDto> {
    const record = await this.prisma.filecoinNode.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Filecoin node with id ${id} doesn't exist`);
    }

    return new FilecoinNodeDto(record);
  }

  async findOneWithContracts(id: string): Promise<FilecoinNodeWithContractsDto> {
    const record = await this.prisma.filecoinNode.findUnique(
      {
        where: { id },
        include: {
          contracts: {
            include: {
              seller: true,
              buyer: true,
              filecoinNode: true,
              purchases: { include: { certificate: true } }
            }
          },
        }
      }
    );

    if (!record) {
      throw new NotFoundException(`Filecoin node with id ${id} doesn't exist`);
    }

    const node = FilecoinNodeWithContractsDto.toDto(record)
    const nodeWithUrls: FilecoinNodeWithContractsDto = {
      ...node,
      contracts: node.contracts.map(c => ({
        ...c,
        pageUrl: `${process.env.UI_BASE_URL}/partners/filecoin/contracts/${c.id}`,
        dataUrl: `${process.env.API_BASE_URL}/api/partners/filecoin/contracts/${c.id}`,
      }))
    }

    return nodeWithUrls
  }

  async update(id: string, updateFilecoinNodeDto: UpdateFilecoinNodeDto): Promise<FilecoinNodeDto> {
    return new FilecoinNodeDto(await this.prisma.filecoinNode.update({ where: { id }, data: updateFilecoinNodeDto }));
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.filecoinNode.delete({ where: { id } });

    return true;
  }

  async getTransactions(id: string) {
    const data = await this.prisma.filecoinNode.findUnique({
      where: { id },
      include: {
        purchases: {
          include: {
            purchase: {
              include: {
                certificate: true
              }
            }
          }
        }
      }
    });

    if (!data) {
      return null;
    }

    const allFiles = await this.filesService.findAll()
    const allRedemptionStatements = allFiles.filter(f => f.fileType === FileType.REDEMPTION_STATEMENT) ?? []

    // should be typed
    return {
      minerId: data.id,
      buyerId: data.buyerId,
      pageUrl: `${process.env.UI_BASE_URL}/partners/filecoin/nodes/${data.id}/beneficiary`,
      dataUrl: `${process.env.API_BASE_URL}/api/partners/filecoin/nodes/${data.id}/transactions`,
      recsTotal: data.purchases.reduce(
        (total, transaction) =>
          total.add(
            BigNumber.from(transaction.purchase.certificate.energyWh).mul(1000000)
          ), BigNumber.from(0)
        ).toNumber() / 1e6,
      transactions: data.purchases.map((p) => {
        const redemptionStatement = allRedemptionStatements.find(rs => rs.purchases.includes(p.purchase.id))
        return {
          id: p.purchase.id,
          pageUrl: `${process.env.UI_BASE_URL}/partners/filecoin/purchases/${p.purchase.id}`,
          dataUrl: `${process.env.API_BASE_URL}/api/partners/filecoin/purchases/${p.purchase.id}`,
          downloadUrl: redemptionStatement?.id ? `${process.env.API_BASE_URL}/api/files/${redemptionStatement.id}` : null,
          ...pick(p.purchase, [
            'sellerId',
            'annually',
            'reportingStart',
            'reportingStartTimezoneOffset',
            'reportingEnd',
            'reportingEndTimezoneOffset',
            'txHash',
            'buyerId',
            'contractId',
            'createdAt',
            'updatedAt'
          ]),
          reportingStartLocal: toDateStringWithOffset(p.purchase.reportingStart, p.purchase.reportingStartTimezoneOffset),
          reportingEndLocal: toDateStringWithOffset(p.purchase.reportingEnd, p.purchase.reportingEndTimezoneOffset),
          generation: {
            ...p.purchase.certificate,
            energyWh: BigNumber.from(p.purchase.certificate.energyWh).toNumber(),
            generationStartLocal: toDateStringWithOffset(p.purchase.certificate.generationStart, p.purchase.certificate.generationStartTimezoneOffset),
            generationEndLocal: toDateStringWithOffset(p.purchase.certificate.generationEnd, p.purchase.certificate.generationEndTimezoneOffset)
          }
        };
      })
    };
  }
}

export const transactionsSchema = {
  type: "object",
  properties: {
    minerId: { type: "string", example: "f0112027" },
    buyerId: { type: "string", example: "29e25d61-103a-4710-b03d-ee12df765066" },
    pageUrl: { type: "string", example: `${process.env.UI_BASE_URL}/partners/filecoin/nodes/f0112027/beneficiary` },
    dataUrl: { type: "string", example: `${process.env.API_BASE_URL}/api/partners/filecoin/nodes/f0112027/transactions` },
    recsTotal: { type: "number", example: 3000000 },
    transactions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", example: "04a7155d-ced1-4981-8660-48670a0735dd" },
          pageUrl: {
            type: "string",
            example: `${process.env.UI_BASE_URL}/partners/filecoin/purchases/04a7155d-ced1-4981-8660-48670a0735dd`
          },
          dataUrl: {
            type: "string",
            example: `${process.env.API_BASE_URL}/api/partners/filecoin/purchases/04a7155d-ced1-4981-8660-48670a0735dd`
          },
          sellerId: { type: "string", example: "68926364-a0ba-4160-b3ea-1ee70c2690dd" },
          txHash: { type: "string", example: "5e7ed59f-18e8-4e3d-b0b6-7e962af095e9" },
          buyerId: { type: "string", example: "b7cda676-b005-44dd-b51b-b8c8d4ebd3dd" },
          contractId: { type: "string", example: "6383554e-0ae6-4400-946a-384ffcb36442" },
          createdAt: { type: "string", format: "date-time", example: "2021-08-26T18:20:30.633Z" },
          updatedAt: { type: "string", format: "date-time", example: "2021-08-26T18:20:30.633Z" },
          annually: {
            type: "array",
            items: {
              type: "object",
              properties: {
                year: { type: "number", example: 2020 },
                amount: { type: "number", example: 3 }
              }
            }
          },
          reportingStart : {type: "string", example: "2019-12-31T21:00:00.000Z"},
          reportingStartTimezoneOffset : {type: "number", example: 180},
          reportingEnd : {type: "string", example: "2020-12-31T20:59:59.999Z"},
          reportingEndTimezoneOffset : {type: "number", example: 180},
          reportingStartLocal : {type: "string", example: "2020-01-01T00:00:00.000+03:00"},
          reportingEndLocal : {type: "string", example: "2020-12-31T23:59:59.999+03:00"},
          generation: {
            type: "object",
            properties: {
              id: { type: "string", example: "ca58b875-68ca-4286-8f88-5ce366103c82" },
              "region": {type: "string", example: "north_china"},
              "country": {type: "string", example: "China"},
              "energySource": {type: "string"},
              "productType": {type: "string"},
              "generatorId": {type: "string"},
              "generatorName": {type: "string"},
              "generationStart": {type: "string", example: "2020-10-31T16:00:00.000Z"},
              "generationStartLocal": {type: "string", example: "2020-11-01T00:00:00.000+08:00"},
              "generationStartTimezoneOffset": {type: "number", example: 480},
              "generationEndLocal": {type: "string", example: "2021-06-02T23:59:59.999+08:00"},
              "generationEndTimezoneOffset": {type: "number", example: 480},
              initialSellerId: { type: "string", example: "68926364-a0ba-4160-b3ea-1ee70c2690dd" },
              txHash: { type: "string", example: "5e7ed59f-18e8-4e3d-b0b6-7e962af095e9" },
              beneficiary: { type: "string", example: "5e7ed59f-18e8-4e3d-b0b6-7e962af095e9" },
              redemptionDate: { type: "string", format: "date-time", example: "2021-08-26T18:20:30.633Z" },
              commissioningDate: { type: "string", format: "date-time", example: "2021-08-26T18:20:30.633Z" },
              capacity: { type: "number", example: 12000 },
              label: { type: "string" },
              createdAt: { type: "string", format: "date-time", example: "2021-08-26T18:20:30.633Z" },
              updatedAt: { type: "string", format: "date-time", example: "2021-08-26T18:20:30.633Z" },
            }
          }
        }
      }
    }
  }
};

function toDateStringWithOffset(date: Date, offsetInMinutes: number): string {
  return DateTime.fromJSDate(date).setZone(offsetToOffsetString(offsetInMinutes)).toISO();
}

function offsetToOffsetString(offsetInMinutes: number): string {
  if (offsetInMinutes === 0) {
    return 'UTC';
  }

  const dur = Duration.fromObject({ minutes: offsetInMinutes });

  const { hours, minutes } = dur.shiftTo('hours', 'minutes').toObject();

  return `UTC${offsetInMinutes > 0 ? '+' : '-'}${Math.abs(hours).toString()}:${Math.abs(minutes).toString().padStart(2, '0')}`;
}
