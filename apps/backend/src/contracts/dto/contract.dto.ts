import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { BuyerDto } from '../../buyers/dto/buyer.dto';
import { SellerDto } from '../../sellers/dto/seller.dto';
import { FilecoinNodeDto } from '../../filecoin-nodes/dto/filecoin-node.dto';
import { Buyer, Contract, CountryEnumType, EnergySourceEnumType, FilecoinNode, LabelEnumType, ProductEnumType, Seller } from '@prisma/client';
import { ArrayMinSize, IsEnum, IsInt, IsISO8601, IsOptional, IsString, IsUUID, Max, Min, Validate, ValidateNested } from 'class-validator';
import { IsDatetimePrismaCompatible } from '../../validators';
import { PositiveBNStringValidator } from '../../utils/positiveBNStringValidator';
import { PurchaseWithCertificateDto, PurchaseWithCertificateEntity } from '../../purchases/dto/purchase-with-certificate.dto';
import { IsStringArrayDistinct } from '../../validators/ArrayDistinct';

export type ContractEntityWithRelations = Contract & {
  seller: Seller,
  buyer: Buyer,
  filecoinNode: FilecoinNode;
  purchases: PurchaseWithCertificateEntity[];
};

export class ContractDto implements Omit<Contract, 'buyerId' | 'sellerId' | 'filecoinNodeId' | 'volume'> {
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
  @IsStringArrayDistinct()
  @ArrayMinSize(1)
  @IsEnum(EnergySourceEnumType, { each: true })
  energySources: EnergySourceEnumType[];

  @ApiProperty({ example: 'EU' })
  @IsString()
  region: string;

  @ApiProperty({ example: [CountryEnumType.DE, CountryEnumType.HR] })
  @ArrayMinSize(1)
  @IsStringArrayDistinct()
  @IsEnum(CountryEnumType, { each: true })
  countries: CountryEnumType[];

  @ApiProperty({ example: '2020-11-01T00:00:00.000Z' })
  @IsISO8601({ strict: true })
  @IsDatetimePrismaCompatible()
  contractDate: Date;

  @ApiProperty({ example: '2021-06-01T23:59:59.999Z' })
  @IsISO8601({ strict: true })
  @IsDatetimePrismaCompatible()
  deliveryDate: Date;

  @ApiProperty({ example: '2020-11-01T00:00:00.000Z' })
  @IsISO8601({ strict: true })
  @IsDatetimePrismaCompatible()
  reportingStart: Date;

  @ApiProperty({ example: '2021-06-01T23:59:59.999Z' })
  @IsISO8601({ strict: true })
  @IsDatetimePrismaCompatible()
  reportingEnd: Date;

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

  @ApiProperty({ type: String, example: "ID_123456" })
  @IsString()
  externalId: string;

  @ApiProperty({ type: String, example: "0xF36706dd093AdB90C3AC9F01f1629713e7094c1f" })
  @IsString()
  onchainId: string;

  @ApiPropertyOptional({ example: LabelEnumType.EUROPEAN_GREEN })
  @IsEnum(LabelEnumType)
  label: LabelEnumType;

  @ApiProperty({ example: '2021-10-11T07:48:46.799Z' })
  createdAt: Date;

  @ApiProperty({ example: "2021-08-26T18:20:30.633Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ example: `${process.env.UI_BASE_URL}/partners/filecoin/contracts/0a420fdb-ff96-42f8-9e99-7c11a6026485` })
  pageUrl?: string;

  @ApiPropertyOptional({ example: `${process.env.API_BASE_URL}/api/partners/filecoin/contracts/0a420fdb-ff96-42f8-9e99-7c11a6026485` })
  dataUrl?: string;

  constructor(partial: Partial<ContractDto>) {
    Object.assign(this, partial);
  }

  static toDto(dbEntity: ContractEntityWithRelations): ContractDto {
    const deliveredVolumeMwh = dbEntity.purchases
      .map(p => p.recsSoldWh)
      .reduce((partialSum, purchaseVolume) => BigInt(partialSum) + BigInt(purchaseVolume), BigInt(0));
    const openVolume = BigInt(dbEntity.volume) - deliveredVolumeMwh;

    return {
      id: dbEntity.id,
      productType: dbEntity.productType,
      energySources: dbEntity.energySources,
      contractDate: dbEntity.contractDate,
      deliveryDate: dbEntity.deliveryDate,
      reportingStart: dbEntity.reportingStart,
      reportingEnd: dbEntity.reportingEnd,
      buyer: BuyerDto.toDto(dbEntity.buyer),
      seller: new SellerDto(dbEntity.seller),
      openVolume: openVolume.toString(),
      deliveredVolume: deliveredVolumeMwh.toString(),
      purchases: dbEntity.purchases.map(p => PurchaseWithCertificateDto.toDto(p)),
      timezoneOffset: dbEntity.timezoneOffset,
      filecoinNode: new FilecoinNodeDto(dbEntity.filecoinNode),
      region: dbEntity.region,
      countries: dbEntity.countries,
      externalId: dbEntity.externalId,
      onchainId: dbEntity.onchainId,
      label: dbEntity.label,
      createdAt: dbEntity.createdAt,
      updatedAt: dbEntity.updatedAt
    }
  }
}
