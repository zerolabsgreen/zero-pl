import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Seller } from '@prisma/client';

export class SellerDto implements Seller {
  @ApiProperty({ example: '59f4b540-373b-452f-9145-dae41afa1977' })
  id: string;

  @ApiProperty({ example: 'Monsoon Carbon' })
  name: string;

  @ApiProperty({ example: 'Mt Arrakis 42, Dune plains' })
  addressLine1: string;

  @ApiProperty({ example: 'Aix en Provence, 12345, France' })
  addressLine2: string;

  @ApiProperty({ example: 'Paul Atreides' })
  contactPerson: string;

  @ApiPropertyOptional({ example: '0xd46aC0Bc23dB5e8AfDAAB9Ad35E9A3bA05E092E8' })
  blockchainAddress: string;

  @ApiProperty( { example: "2021-08-26T18:20:30.633Z" })
  createdAt: Date;

  @ApiProperty( { example: "2021-08-26T18:20:30.633Z" })
  updatedAt: Date;

  constructor(partial: Partial<SellerDto>) {
    Object.assign(this, partial);
  }
}
