import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CertificatesService } from '../certificates/certificates.service';
import { BuyersService } from '../buyers/buyers.service';
import { Contract } from '@prisma/client';
import { SellersService } from '../sellers/sellers.service';
import { FilecoinNodesService } from '../filecoin-nodes/filecoin-nodes.service';
import { ContractDto } from './dto/contract.dto';
import { CertificateDto } from '../certificates/dto/certificate.dto';
import { BuyerDto } from '../buyers/dto/buyer.dto';

@Injectable()
export class ContractsService {
  private readonly logger = new Logger(CertificatesService.name, { timestamp: true });

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
            buyer: { connect: { id: createContractDto.buyerId }},
            seller: { connect: { id: createContractDto.sellerId }},
            generationStart:  createContractDto.generationStart,
            generationEnd: createContractDto.generationEnd,
            timezoneOffset: createContractDto.timezoneOffset,
            openVolume: BigInt(createContractDto.openVolume),
            productType: createContractDto.productType,
            country: createContractDto.country,
            region: createContractDto.region ?? '',
            deliveredVolume: BigInt(0)
          },
          include: {
            seller: true,
            buyer: true,
            filecoinNode: true,
            certificates: true
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

  async findAll(): Promise<ContractDto[]> {
    const contracts = await this.prisma.contract.findMany({
      include: {
        seller: true,
        buyer: true,
        filecoinNode: true,
        certificates: true
      }
    });

    return contracts.map(contract => ContractDto.toDto(contract));
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
        certificates: true
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
          buyer: { connect: { id: updateContractDto.buyerId }},
          seller: { connect: { id: updateContractDto.sellerId }},
          generationStart:  updateContractDto.generationStart,
          generationEnd: updateContractDto.generationEnd,
          timezoneOffset: updateContractDto.timezoneOffset,
          openVolume: BigInt(updateContractDto.openVolume),
          productType: updateContractDto.productType,
          country: updateContractDto.country,
          region: updateContractDto.region ?? '',
          deliveredVolume: BigInt(0)
        },
        include: {
          seller: true,
          buyer: true,
          filecoinNode: true,
          certificates: true
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
