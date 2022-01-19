import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnergySourceEnumType, ProductEnumType } from '@prisma/client';

export class CertificateDto {
  @ApiProperty({ example: '973d48bb-15da-4eaf-8040-b6cb66e22023' })
  id: string;

  @ApiProperty({ example: 'Solar 1 - Non Bua Lampon' })
  generatorName: string;

  @ApiProperty({ example: 'NA' })
  generatorId: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  initialSellerId: string;

  @ApiProperty({ example: 'NE' })
  region: string;

  @ApiProperty({ example: 'China' })
  country: string;

  @ApiProperty()
  energy: string;

  @ApiProperty({ example: EnergySourceEnumType.SOLAR })
  energySource: EnergySourceEnumType;

  @ApiProperty({ example: ProductEnumType.IREC })
  productType: ProductEnumType;

  @ApiProperty({ example: new Date('2020-11-01T00:00:00.000Z') })
  generationStart: string;

  @ApiPropertyOptional({ example: 180 })
  generationStartTimezoneOffset?: number;

  @ApiProperty({ example: new Date('2021-06-01T23:59:59.999Z') })
  generationEnd: string;

  @ApiPropertyOptional({ example: 180 })
  generationEndTimezoneOffset?: number;

  @ApiProperty({ example: '0x65ca0692df73b3ff23126fd69e15d2f7de7a317def6016ebfdeedde1e24a7a8f' })
  txHash: string; 

  @ApiPropertyOptional({ example: 'Some Corp Ltd.' })
  beneficiary?: string;

  @ApiPropertyOptional({ example: new Date('2021-06-30T23:59:59.999Z') })
  redemptionDate?: string;

  constructor(partial: Partial<CertificateDto>) {
    Object.assign(this, partial);
  }
}
