import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Buyer, FilecoinNode } from "@prisma/client";
import { FilecoinNodeDto } from "../../filecoin-nodes/dto/filecoin-node.dto";

export class BuyerDto implements Buyer {
  @ApiProperty({ example: '29e25d61-103a-4710-b03d-ee12df765066' })
  id: string;

  @ApiProperty({ example: '-' })
  name: string;

  @ApiProperty({ example: '0x9442ED348b161af888e6cB999951aE8b961F7B4B' })
  blockchainAddress: string;

  @ApiPropertyOptional({ type: [FilecoinNodeDto] })
  filecoinNodes?: FilecoinNodeDto[];

  @ApiProperty( { example: "2021-08-26T18:20:30.633Z" })
  createdAt: Date;

  @ApiProperty( { example: "2021-08-26T18:20:30.633Z" })
  updatedAt: Date;

  constructor(partial: Partial<BuyerDto>) {
    Object.assign(this, partial);
  }

  static toDto(dbEntity: Buyer & { filecoinNodes?: FilecoinNode[]}): BuyerDto {
    return {
      ...dbEntity,
      filecoinNodes: dbEntity.filecoinNodes?.map(node => new FilecoinNodeDto(node))
    };
  }
}
