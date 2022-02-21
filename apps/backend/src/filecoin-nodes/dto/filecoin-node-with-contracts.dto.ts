import { ApiProperty, PartialType } from "@nestjs/swagger"
import { FilecoinNode } from "@prisma/client";
import { ContractDto, ContractEntityWithRelations } from "../../contracts/dto/contract.dto";
import { FindContractDto } from "../../contracts/dto/find-contract.dto";
import { FilecoinNodeDto } from "./filecoin-node.dto";

export class FilecoinNodeWithContractsDto extends PartialType(FilecoinNodeDto) {
  @ApiProperty({ type: [FindContractDto] })
  contracts: FindContractDto[];

  static toDto(filecoinNodeWithRelations: FilecoinNode & {
    contracts: ContractEntityWithRelations[];
  }): FilecoinNodeWithContractsDto {
    const contracts = filecoinNodeWithRelations.contracts.map(c => ContractDto.toDto(c))
    const contractsWithCountryRegionMap = contracts.map(contract => FindContractDto.toDto(contract))
    return {
      ...filecoinNodeWithRelations,
      contracts: contractsWithCountryRegionMap
    }
  }
}
