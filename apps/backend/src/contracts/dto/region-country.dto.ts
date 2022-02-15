import { ApiProperty } from '@nestjs/swagger';
import { CountryEnumType } from '@prisma/client';
import { IsString, IsEnum } from 'class-validator';

export class RegionCountryDto {
  @ApiProperty({ example: 'EU' })
  @IsString()
  region: string;

  @ApiProperty({ example: CountryEnumType.DE })
  @IsEnum(CountryEnumType)
  country: CountryEnumType;
}
