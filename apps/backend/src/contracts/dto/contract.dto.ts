import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BuyerDto } from '../../buyers/dto/buyer.dto';
import { SellerDto } from '../../sellers/dto/seller.dto';
import { FilecoinNodeDto } from '../../filecoin-nodes/dto/filecoin-node.dto';
import { Buyer, Contract, CountryEnumType, EnergySourceEnumType, FilecoinNode, ProductEnumType, Seller } from '@prisma/client';
import { IsEnum, IsInt, IsISO8601, IsOptional, IsString, IsUUID, Max, Min, Validate, ValidateNested } from 'class-validator';
import { IsDatetimePrismaCompatible } from '../../validators';
import { PositiveBNStringValidator } from '../../utils/positiveBNStringValidator';
import { PurchaseWithCertificateDto, PurchaseWithCertificateEntity } from '../../purchases/dto/purchase-with-certificate.dto';

export type ContractEntityWithRelations = Contract & {
  seller: Seller,
  buyer: Buyer,
  filecoinNode: FilecoinNode;
  purchases: PurchaseWithCertificateEntity[];
};

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

  @ApiProperty({ description: 'Volume in Wh', example: 4e12.toString() })
  @Validate(PositiveBNStringValidator)
  openVolume: string;

  @ApiProperty({ description: 'Volume in Wh', example: 6e12.toString() })
  @Validate(PositiveBNStringValidator)
  deliveredVolume: string;

  @ApiProperty({ type: [PurchaseWithCertificateDto] })
  @ValidateNested({ each: true })
  purchases: PurchaseWithCertificateDto[];

  @ApiPropertyOptional({ type: String, example: "ID_123456" })
  @IsOptional()
  @IsString()
  externalId?: string;

  constructor(partial: Partial<ContractDto>) {
    Object.assign(this, partial);
  }

  static toDto(dbEntity: ContractEntityWithRelations): ContractDto {
    const deliveredVolumeMwh = dbEntity.purchases
      .map(p => p.certificate.energy)
      .reduce((partialSum, purchaseVolume) => BigInt(partialSum) + BigInt(purchaseVolume), BigInt(0));
    const openVolume = BigInt(dbEntity.volume) - deliveredVolumeMwh;
    
    return {
      id: dbEntity.id,
      productType: dbEntity.productType,
      energySources: dbEntity.energySources,
      contractDate: dbEntity.contractDate.toISOString(),
      deliveryDate: dbEntity.deliveryDate.toISOString(),
      reportingStart: dbEntity.reportingStart.toISOString(),
      reportingEnd: dbEntity.reportingEnd.toISOString(),
      buyer: BuyerDto.toDto(dbEntity.buyer),
      seller: new SellerDto(dbEntity.seller),
      openVolume: openVolume.toString(),
      deliveredVolume: deliveredVolumeMwh.toString(),
      purchases: dbEntity.purchases.map(p => PurchaseWithCertificateDto.toDto(p)),
      timezoneOffset: dbEntity.timezoneOffset,
      filecoinNode: new FilecoinNodeDto(dbEntity.filecoinNode),
      country: dbEntity.country,
      externalId: dbEntity.externalId
    }
  }
}
