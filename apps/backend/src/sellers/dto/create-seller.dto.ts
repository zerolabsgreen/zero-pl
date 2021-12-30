import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSellerDto {
  @ApiPropertyOptional({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({ example: 'Monsoon Carbon' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Mt Arrakis 42, Dune plains' })
  @IsString()
  addressLine1: string;

  @ApiPropertyOptional({ example: 'Aix en Provence, 12345, France' })
  @IsString()
  @IsOptional()
  addressLine2: string;

  @ApiPropertyOptional({ example: 'Paul Atreides' })
  @IsString()
  @IsOptional()
  contactPerson: string;
}
