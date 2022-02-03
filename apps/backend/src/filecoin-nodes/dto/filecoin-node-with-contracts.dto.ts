import { ApiProperty, PartialType } from "@nestjs/swagger"
import { FilecoinNode } from "@prisma/client";
import { ContractDto, ContractEntityWithRelations } from "../../contracts/dto/contract.dto";
import { FilecoinNodeDto } from "./filecoin-node.dto";

export class FilecoinNodeWithContractsDto extends PartialType(FilecoinNodeDto) {
  @ApiProperty({ type: [ContractDto] })
  contracts: ContractDto[];

  static toDto(filecoinNodeWithRelations: FilecoinNode & {
    contracts: ContractEntityWithRelations[];
  }): FilecoinNodeWithContractsDto {
    return {
      ...filecoinNodeWithRelations,
      contracts: filecoinNodeWithRelations.contracts.map(c => ContractDto.toDto(c))
    }
  }
}
