import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Certificate, CountryEnumType, EnergySourceEnumType, LabelEnumType, ProductEnumType } from '@prisma/client';
import { BigNumber } from 'ethers';

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

  @ApiProperty({ example: CountryEnumType.DE })
  country: CountryEnumType;

  @ApiProperty({ example: '1000000'})
  energyWh: string;

  @ApiProperty({ example: EnergySourceEnumType.SOLAR })
  energySource: EnergySourceEnumType;

  @ApiProperty({ example: ProductEnumType.IREC })
  productType: ProductEnumType;

  @ApiProperty({ example: '2020-11-01T00:00:00.000Z' })
  generationStart: Date;

  @ApiPropertyOptional({ example: 180 })
  generationStartTimezoneOffset?: number;

  @ApiProperty({ example: '2021-06-01T23:59:59.999Z' })
  generationEnd: Date;

  @ApiPropertyOptional({ example: 180 })
  generationEndTimezoneOffset?: number;

  @ApiProperty({ example: '0x65ca0692df73b3ff23126fd69e15d2f7de7a317def6016ebfdeedde1e24a7a8f' })
  txHash: string; 

  @ApiPropertyOptional({ example: 'Some Corp Ltd.' })
  beneficiary?: string;

  @ApiPropertyOptional({ example: '2021-06-30T23:59:59.999Z' })
  redemptionDate?: Date;

  @ApiPropertyOptional({ example: 1e9 })
  nameplateCapacityW?: number;

  @ApiPropertyOptional({ example: '2021-06-30T23:59:59.999Z' })
  commissioningDate?: Date;

  @ApiPropertyOptional({ example: LabelEnumType.EUROPEAN_GREEN })
  label?: LabelEnumType;

  @ApiProperty({ example: "2021-08-26T18:20:30.633Z" })
  createdAt: Date;

  @ApiProperty({ example: "2021-08-26T18:20:30.633Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ example: 'Certificate_CID' })
  certificateCid?: string;

  @ApiPropertyOptional({ example: '123' })
  batchId?: string;

  constructor(partial: Partial<CertificateDto>) {
    Object.assign(this, partial);
  }

  static toDbEntity(dto: Partial<CertificateDto>): Partial<Certificate> {
    const { batchId, energyWh, ...stripped } = dto;

    return {
      ...stripped,
      energyWh: energyWh ? BigNumber.from(energyWh).toBigInt() : undefined,
      batchId: batchId ? BigNumber.from(batchId).toBigInt() : undefined
    };
  }

  static toDto(dbEntity: Certificate): CertificateDto {
    const { batchId, energyWh, ...stripped } = dbEntity;

    return {
      ...stripped,
      energyWh: energyWh ? BigNumber.from(energyWh).toString() : undefined,
      batchId: batchId ? BigNumber.from(batchId).toString() : undefined
    };
  }

}
