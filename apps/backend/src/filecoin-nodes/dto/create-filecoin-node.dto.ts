import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CountryEnumType } from '@prisma/client';
import { IsString, IsUUID, IsEnum, IsOptional } from 'class-validator';

export class CreateFilecoinNodeDto {
  @ApiProperty({ example: "f0112027" })
  @IsString()
  id: string;

  @ApiProperty({ example: "29e25d61-103a-4710-b03d-ee12df765066" })
  @IsUUID()
  buyerId: string

  @ApiPropertyOptional({ example: "Frankfurt am Main" })
  @IsOptional()
  @IsString()
  region: string;

  @ApiPropertyOptional({ example: CountryEnumType.DE })
  @IsOptional()
  @IsEnum(CountryEnumType)
  country: CountryEnumType;
}
