import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { BuyersService } from '../buyers/buyers.service';
import { SellersService } from '../sellers/sellers.service';
import { FilecoinNodesService } from '../filecoin-nodes/filecoin-nodes.service';
import { ContractDto, ContractEntityWithRelations } from './dto/contract.dto';
import { Contract } from '@prisma/client';
import { PaginatedDto } from '../utils/paginated.dto';
import { FindContractDto } from './dto/find-contract.dto';

@Injectable()
export class ContractsService {
  private readonly logger = new Logger(ContractsService.name, { timestamp: true });

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private buyersService: BuyersService,
    private sellersService: SellersService,
    private filecoinNodesService: FilecoinNodesService
  ) {
    this.logger.debug(`PG_TRANSACTION_TIMEOUT=${this.configService.get('PG_TRANSACTION_TIMEOUT') / 1000}s`);
  }

  async create(createContractDtos: CreateContractDto[]): Promise<ContractDto[]> {
    this.logger.log(`received request to create Contracts: ${JSON.stringify(createContractDtos)}`);

    const contracts: ContractDto[] = [];

    await this.prisma.$transaction(async (prisma) => {
      for (const createContractDto of createContractDtos) {
        const buyer = await this.buyersService.findOne(createContractDto.buyerId);

        if (!buyer) {
          this.logger.error(`Contract submitted for non-existing buyerId=${createContractDto.buyerId}`);
          throw new NotFoundException(`buyerId=${createContractDto.buyerId} not found`);
        }

        const seller = await this.sellersService.findOne(createContractDto.sellerId);

        if (!seller) {
          this.logger.error(`Contract submitted for non-existing sellerId=${createContractDto.sellerId}`);
          throw new NotFoundException(`sellerId=${createContractDto.sellerId} not found`);
        }

        let filecoinNode; 

        if (createContractDto.filecoinNodeId) {
          filecoinNode = await this.filecoinNodesService.findOne(createContractDto.filecoinNodeId);
  
          if (!filecoinNode) {
            this.logger.error(`Contract submitted for non-existing filecoinNodeId=${createContractDto.filecoinNodeId}`);
            throw new NotFoundException(`filecoinNodeId=${createContractDto.filecoinNodeId} not found`);
          }
        }

        const newRecord = await prisma.contract.create({
          data: {
            id: createContractDto.id,
            buyer: { connect: { id: createContractDto.buyerId }},
            seller: { connect: { id: createContractDto.sellerId }},
            filecoinNode: { connect: { id: createContractDto.filecoinNodeId }},
            energySources: createContractDto.energySources,
            contractDate: createContractDto.contractDate,
            deliveryDate: createContractDto.deliveryDate,
            reportingStart:  createContractDto.reportingStart,
            reportingEnd: createContractDto.reportingEnd,
            timezoneOffset: createContractDto.timezoneOffset,
            volume: BigInt(createContractDto.volume),
            productType: createContractDto.productType,
            countries: createContractDto.countries,
            region: createContractDto.region ?? '',
            externalId: createContractDto.externalId,
            label: createContractDto.label
          },
          include: {
            seller: true,
            buyer: true,
            filecoinNode: true,
            purchases: { include: { certificate: true } }
          }
        }).catch(err => {
          this.logger.error(`error creating a new Contract: ${err}`);
          throw err;
        });

        contracts.push(ContractDto.toDto(newRecord));
      }
    }, { timeout: this.configService.get('PG_TRANSACTION_TIMEOUT') }).catch((err) => {
      this.logger.error('rolling back transaction');
      throw err;
    });

    return contracts;
  }

  async findAll(query?: {
    skip?: number;
    take?: number;
  }): Promise<PaginatedDto<FindContractDto>> {
    const total = await this.prisma.contract.count();

    const take = query?.take || total;
    const skip = query?.skip || 0;

    const contracts = await this.prisma.contract.findMany({
      skip,
      take,
      include: {
        seller: true,
        buyer: true,
        filecoinNode: true,
        purchases: { include: { certificate: true } }
      }
    });

    return {
      data: contracts.map(c => FindContractDto.toDto(ContractDto.toDto(c))),
      total,
      count: contracts.length
    };
  }

  async findOne(id: string): Promise<ContractDto> {
    const data = await this.prisma.contract.findUnique({
      where: {
        id
      },
      include: {
        seller: true,
        buyer: true,
        filecoinNode: true,
        purchases: { include: { certificate: true } }
      }
    });

    if (!data) {
      return null;
    }

    return ContractDto.toDto(data);
  }

  async update(id: string, updateContractDto: UpdateContractDto): Promise<ContractDto> {
    return await this.prisma.$transaction(async () => {
      const newContract = await this.prisma.contract.update({
        where: { id },
        data: {
          buyerId: updateContractDto.buyerId,
          sellerId: updateContractDto.sellerId,
          contractDate: updateContractDto.contractDate,
          deliveryDate: updateContractDto.deliveryDate,
          reportingStart:  updateContractDto.reportingStart,
          reportingEnd: updateContractDto.reportingEnd,
          timezoneOffset: updateContractDto.timezoneOffset,
          volume: updateContractDto.volume ? BigInt(updateContractDto.volume) : undefined,
          productType: updateContractDto.productType,
          countries: updateContractDto.countries,
          region: updateContractDto.region ?? '',
          externalId: updateContractDto.externalId,
          label: updateContractDto.label
        },
        include: {
          seller: true,
          buyer: true,
          filecoinNode: true,
          purchases: { include: { certificate: true } }
        }
      });

      return ContractDto.toDto(newContract);
    });
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.$transaction([
      this.prisma.contract.delete({ where: { id } })
    ]);

    return true;
  }

}
