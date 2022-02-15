import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { BuyersService } from '../buyers/buyers.service';
import { SellersService } from '../sellers/sellers.service';
import { FilecoinNodesService } from '../filecoin-nodes/filecoin-nodes.service';
import { ContractDto } from './dto/contract.dto';

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
            externalId: createContractDto.externalId,
            label: createContractDto.label
          }
        }).catch(err => {
          this.logger.error(`error creating a new Contract: ${err}`);
          throw err;
        });

        for (const regionCountry of createContractDto.regionCountries) {
          let toBeAssigned = await prisma.regionCountry.findFirst({ where: {
            country: regionCountry.country,
            region: regionCountry.region
          }})

          if (!toBeAssigned) {
            toBeAssigned = await prisma.regionCountry.create({
              data: {
                country: regionCountry.country,
                region: regionCountry.region
              }
            }).catch(err => {
              this.logger.error(`error creating a new RegionCountry: ${err}`);
              throw err;
            });
          }

          await prisma.regionCountryOnContracts.create({
            data: {
              regionCountryId: toBeAssigned.id,
              contractId: newRecord.id
            }
          }).catch(err => {
            this.logger.error(`error linking regionCountry to the contract: ${err}`);
            throw err;
          });
        }

        const completeContract = await prisma.contract.findUnique({
          where: { id: newRecord.id },
          include: {
            seller: true,
            buyer: true,
            filecoinNode: true,
            purchases: { include: { certificate: true } },
            regionCountries: { include: { regionCountry: true }}
          }
        }).catch(err => {
          this.logger.error(`error getting the Contract: ${err}`);
          throw err;
        });

        contracts.push(ContractDto.toDto(completeContract));
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
        purchases: { include: { certificate: true } },
        regionCountries: { include: { regionCountry: true } }
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
        purchases: { include: { certificate: true } },
        regionCountries: { include: { regionCountry: true } }
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
          externalId: updateContractDto.externalId,
          label: updateContractDto.label
        },
        include: {
          seller: true,
          buyer: true,
          filecoinNode: true,
          purchases: { include: { certificate: true } },
          regionCountries: { include: { regionCountry: true } }
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
