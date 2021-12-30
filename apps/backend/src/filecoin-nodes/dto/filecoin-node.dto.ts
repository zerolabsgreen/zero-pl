import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { FilecoinNode } from "@prisma/client"

export class FilecoinNodeDto implements FilecoinNode{
  @ApiProperty({ example: "f0112027" })
  id: string;

  @ApiProperty({ example: "29e25d61-103a-4710-b03d-ee12df765066" })
  buyerId: string

  @ApiPropertyOptional({ example: '0x9442ED348b161af888e6cB999951aE8b961F7B4B' })
  blockchainAddress: string;

  constructor(partial: Partial<FilecoinNodeDto>) {
    Object.assign(this, partial);
  }
}
