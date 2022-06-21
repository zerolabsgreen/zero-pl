import axios, { AxiosInstance } from 'axios';
import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Buyer, Contract, Seller } from '@prisma/client';

import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { BuyersService } from '../buyers/buyers.service';
import { SellersService } from '../sellers/sellers.service';
import { FilecoinNodesService } from '../filecoin-nodes/filecoin-nodes.service';
import { ContractDto, ContractEntityWithRelations } from './dto/contract.dto';
import { PaginatedDto } from '../utils/paginated.dto';
import { FindContractDto } from './dto/find-contract.dto';

@Injectable()
export class ContractsService {
  private readonly logger = new Logger(ContractsService.name, { timestamp: true });
  private readonly axiosInstance: AxiosInstance;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private buyersService: BuyersService,
    private sellersService: SellersService,
    private filecoinNodesService: FilecoinNodesService
  ) {
    this.logger.debug(`PG_TRANSACTION_TIMEOUT=${this.configService.get('PG_TRANSACTION_TIMEOUT') / 1000}s`);

    this.axiosInstance = axios.create({
      baseURL: `${this.configService.get('TOKENIZATION_BASE_URL')}/api`,
      headers: { 'X-Api-Key': this.configService.get('SUPERADMIN_API_KEY') }
    });
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

        let contract = await prisma.contract.create({
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
            onchainId: createContractDto.onchainId,
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

        if (!contract.onchainId) {
          contract = await this.deployOnChain(contract.id);
        }

        contracts.push(ContractDto.toDto(contract));
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

  async findOne(id: Contract['id']): Promise<ContractDto> {
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
      throw new NotFoundException(`No contract with ID ${id} exists.`)
    }

    return ContractDto.toDto(data);
  }

  async findOneRaw(id: Contract['id']): Promise<Contract & { seller: Seller, buyer: Buyer }> {
    const data = await this.prisma.contract.findUnique({
      where: { id },
      include: {
        seller: true,
        buyer: true,
      }
    });

    if (!data) {
      throw new NotFoundException(`No contract with ID ${id} exists.`)
    }

    return data;
  }

  async update(id: Contract['id'], updateContractDto: UpdateContractDto): Promise<ContractDto> {
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

  async remove(id: Contract['id']): Promise<boolean> {
    await this.prisma.$transaction([
      this.prisma.contract.delete({ where: { id } })
    ]);

    return true;
  }

  async deployOnChain(contractId: Contract['id']): Promise<ContractEntityWithRelations> {
    const contract = await this.findOneRaw(contractId);

    if (contract.onchainId) {
      throw new ConflictException(`Contract ${contractId} already has an onchainId: ${contract.onchainId}`);
    }

    const dto = {
      seller: contract.seller.blockchainAddress,
      buyer: contract.buyer.blockchainAddress,
      amount: contract.volume.toString(),
      energySources: contract.energySources
    };

    this.logger.debug(`[Contract ${contractId}] Deploying on-chain...`);

    const { data: agreement } = (
      await this.axiosInstance.post(
        `/agreement`,
        dto
      ).catch((err) => {
        this.logger.error(`POST /agreement error response: ${err}`);
        this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
        throw err;
      })
    );

    const updatedContract = await this.prisma.contract.update({
      where: { id: contractId },
      data: { onchainId: agreement.address },
      include: {
        seller: true,
        buyer: true,
        filecoinNode: true,
        purchases: { include: { certificate: true } }
      }
    });

    return updatedContract;
  }

}
