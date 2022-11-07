import axios, { AxiosInstance } from 'axios';
import { ConflictException, Injectable, Logger, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { Buyer, Contract, Seller } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { hashMessage } from 'ethers/lib/utils';

import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BuyersService } from '../buyers/buyers.service';
import { SellersService } from '../sellers/sellers.service';
import { FilecoinNodesService } from '../filecoin-nodes/filecoin-nodes.service';
import { ContractDto, ContractEntityWithRelations } from './dto/contract.dto';
import { PaginatedDto } from '../utils/paginated.dto';
import { FindContractDto } from './dto/find-contract.dto';
import { TxHash } from '../utils/types';

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

        const contract = await prisma.contract.create({
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

        // Commenting out for now, as we want to separate off-chain and on-chain contracts creation
        // if (!contract.onchainId) {
        //   contract = await this.deployOnChain(contract.id);
        // }

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

  async findMultipleRaw(ids: Contract['id'][]): Promise<(Contract & { seller: Seller, buyer: Buyer })[]> {
    const data = await this.prisma.contract.findMany({
      where: { id: { in: ids } },
      include: {
        seller: true,
        buyer: true,
      }
    });

    if (data.length !== ids.length) {
      throw new NotFoundException(`Incorrect contract ID`);
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

  async deployOnchain(contractIds: Contract['id'][]): Promise<ContractEntityWithRelations[]> {
    const contracts = await this.findMultipleRaw(contractIds);

    const dtos = [];

    await this.setOnChainIdIfDeployed(contracts);

    for (const contract of contracts) {
      if (contract.onchainId) {
        throw new ConflictException(`Contract ${contract.id} already has an onchainId: ${contract.onchainId}`);
      }

      dtos.push({
        salt: hashMessage(contract.id),
        seller: contract.seller.blockchainAddress,
        buyer: contract.buyer.blockchainAddress,
        amount: contract.volume.toString(),
        energySources: contract.energySources
      });
    }

    this.logger.debug(`Deploying contracts on-chain...`);

    const { data: agreements } = (
      await this.axiosInstance.post(
        `/agreement`,
        dtos
      ).catch((err) => {
        this.logger.error(`POST /agreement error response: ${err}`);
        this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
        throw err;
      })
    );

    const updatedContracts = [];

    for (const [index, agreement] of agreements.entries()) {
      const updatedContract = await this.prisma.contract.update({
        where: { id: contractIds[index] },
        data: { onchainId: agreement.address },
        include: {
          seller: true,
          buyer: true,
          filecoinNode: true,
          purchases: { include: { certificate: true } }
        }
      });

      updatedContracts.push(updatedContract);
    }

    return updatedContracts;
  }

  async signOnchain(contractIds: Contract['id'][]): Promise<TxHash> {
    const contracts = await this.findMultipleRaw(contractIds);
    this.logger.debug(`Signing contracts on-chain...`);

    for (const contract of contracts) {
      if (!contract.onchainId) {
        throw new PreconditionFailedException(
          `Contract ${contract.id} hasn't been deployed onchain yet. Please deploy before signing.`
        );
      }

      const { data: onchainAgreement } = (
        await this.axiosInstance.get(
          `/agreement/${contract.onchainId}`
        ).catch((err) => {
          this.logger.error(`GET /agreement/${contract.onchainId} error response: ${err}`);
          this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
          throw err;
        })
      );
  
      if (onchainAgreement.signed) {
        throw new ConflictException(`Contract ${contract.id} has already been signed.`);
      }
    }

    const { data: signatureTxHash } = (
      await this.axiosInstance.post(
        `/agreement/sign`,
        contracts.map(c => c.onchainId)
      ).catch((err) => {
        this.logger.error(`POST /agreement/sign error response: ${err}`);
        this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
        throw err;
      })
    );

    return signatureTxHash;
  }

  private async setOnChainIdIfDeployed(contracts: Contract[]): Promise<void> {
    for (const contract of contracts) {
      if (contract.onchainId) {
        this.logger.debug(`Contract ${contract.id} already has an onchainId.`);
        continue;
      }

      this.logger.debug(`Checking if contract ${contract.id} has already been deployed on-chain...`);
  
      try {
        const { data: agreementAddress } = await this.axiosInstance.get(
          `/agreement/deployed/${hashMessage(contract.id)}`
        );
        this.logger.debug(`Contract ${contract.id} has already been deployed on-chain, but on-chain ID has not been set. Setting...`);

        await this.prisma.contract.update({
          where: { id: contract.id },
          data: { onchainId: agreementAddress },
        });
      } catch (e) {
        console.log({
          e
        })
        if (e.response?.status === 404) {
          this.logger.debug(`Contract ${contract.id} has not been deployed on-chain yet. Proceeding...`);
        } else {
          throw e;
        }
      }
    }
  }

}
