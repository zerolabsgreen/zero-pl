import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BuyerDto } from '../../buyers/dto/buyer.dto';
import { SellerDto } from '../../sellers/dto/seller.dto';
import { CertificateDto } from '../../certificates/dto/certificate.dto';
import { FilecoinNodeDto } from '../../filecoin-nodes/dto/filecoin-node.dto';
import { Buyer, Certificate, Contract, CountryEnumType, EnergySourceEnumType, FilecoinNode, ProductEnumType, Seller } from '@prisma/client';
import { IsEnum, IsInt, IsISO8601, IsOptional, IsString, IsUUID, Max, Min, Validate, ValidateNested } from 'class-validator';
import { IsDatetimePrismaCompatible } from '../../validators';
import { PositiveBNStringValidator } from '../../utils/positiveBNStringValidator';

export class ContractDto {
  @ApiProperty({ example: '4bfce36e-3fcd-4a41-b752-94a5298b8eb6' })
  @IsUUID()
  id: string;

  @ApiProperty({ type: SellerDto })
  @ValidateNested()
  seller: SellerDto;

  @ApiProperty({ type: BuyerDto })
  @ValidateNested()
  buyer: BuyerDto;

  @ApiProperty({ type: FilecoinNodeDto })
  @ValidateNested()
  filecoinNode: FilecoinNodeDto;

  @ApiProperty({ example: ProductEnumType.IREC })
  @IsEnum(ProductEnumType)
  productType: ProductEnumType;

  @ApiProperty({ example: [EnergySourceEnumType.SOLAR, EnergySourceEnumType.WIND] })
  @IsEnum(ProductEnumType, { each: true })
  energySources: EnergySourceEnumType[];

  @ApiPropertyOptional({ example: 'NE' })
  @IsString()
  @IsOptional()
  region?: string;

  @ApiProperty({ example: CountryEnumType.DE })
  @IsEnum(CountryEnumType)
  country: CountryEnumType;

  @ApiProperty({ example: new Date('2020-11-01T00:00:00.000Z') })
  @IsISO8601({ strict: true })
  @IsDatetimePrismaCompatible()
  contractDate: string;

  @ApiProperty({ example: new Date('2021-06-01T23:59:59.999Z') })
  @IsISO8601({ strict: true })
  @IsDatetimePrismaCompatible()
  deliveryDate: string;

  @ApiProperty({ example: new Date('2020-11-01T00:00:00.000Z') })
  @IsISO8601({ strict: true })
  @IsDatetimePrismaCompatible()
  reportingStart: string;

  @ApiProperty({ example: new Date('2021-06-01T23:59:59.999Z') })
  @IsISO8601({ strict: true })
  @IsDatetimePrismaCompatible()
  reportingEnd: string;

  @ApiProperty({ example: 180 })
  @IsInt()
  @Min(-780)
  @Max(780)
  timezoneOffset: number;

  @ApiProperty({ example: 4e12.toString() })
  @Validate(PositiveBNStringValidator)
  openVolume: string;

  @ApiProperty({ example: 6e12.toString() })
  @Validate(PositiveBNStringValidator)
  deliveredVolume: string;

  @ApiProperty({ type: [CertificateDto] })
  @ValidateNested({ each: true })
  certificates: CertificateDto[];

  @ApiPropertyOptional({ example: 123456 })
  @IsOptional()
  @IsInt()
  externalId?: number;

  constructor(partial: Partial<ContractDto>) {
    Object.assign(this, partial);
  }

  static toDto(dbEntity: Contract & {
    seller: Seller,
    buyer: Buyer,
    filecoinNode: FilecoinNode;
    certificates: Certificate[];
  }): ContractDto {
    return {
      ...dbEntity,
      contractDate: dbEntity.contractDate.toISOString(),
      deliveryDate: dbEntity.deliveryDate.toISOString(),
      reportingStart: dbEntity.reportingStart.toISOString(),
      reportingEnd: dbEntity.reportingEnd.toISOString(),
      buyer: BuyerDto.toDto(dbEntity.buyer),
      seller: new SellerDto(dbEntity.seller),
      openVolume: dbEntity.openVolume.toString(),
      deliveredVolume: dbEntity.deliveredVolume.toString(),
      certificates: dbEntity.certificates.map(cert => CertificateDto.toDto(cert)),
      externalId: dbEntity.externalId
    }
  }
}
