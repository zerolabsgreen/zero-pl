import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CountryEnumType, FilecoinNode } from "@prisma/client"

export class FilecoinNodeDto implements FilecoinNode {
  @ApiProperty({ example: "f0112027" })
  id: string;

  @ApiProperty({ example: "29e25d61-103a-4710-b03d-ee12df765066" })
  buyerId: string

  @ApiPropertyOptional({ example: '0x9442ED348b161af888e6cB999951aE8b961F7B4B' })
  blockchainAddress: string;

  @ApiPropertyOptional({ example: 'Frankfurt am Main' })
  region: string;
  
  @ApiPropertyOptional({ example: CountryEnumType.DE })
  country: CountryEnumType;

  @ApiProperty( { example: "2021-08-26T18:20:30.633Z" })
  createdAt: Date;

  @ApiProperty( { example: "2021-08-26T18:20:30.633Z" })
  updatedAt: Date;

  constructor(partial: Partial<FilecoinNodeDto>) {
    Object.assign(this, partial);
  }
}
