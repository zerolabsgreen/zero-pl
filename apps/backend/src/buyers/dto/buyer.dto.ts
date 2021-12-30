import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Buyer } from "@prisma/client";
import { FilecoinNodeDto } from "../../filecoin-nodes/dto/filecoin-node.dto";

export class BuyerDto implements Buyer{
  @ApiProperty({ example: '29e25d61-103a-4710-b03d-ee12df765066' })
  id: string;

  @ApiProperty({ example: '-' })
  name: string;

  @ApiPropertyOptional({ example: '0x9442ED348b161af888e6cB999951aE8b961F7B4B' })
  blockchainAddress: string;

  @ApiProperty({ type: [FilecoinNodeDto] })
  filecoinNodes: FilecoinNodeDto[]

  constructor(partial: Partial<BuyerDto>) {
    Object.assign(this, partial);
  }
}
