import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BuyerDto } from '../../buyers/dto/buyer.dto';
import { SellerDto } from '../../sellers/dto/seller.dto';
import { CertificateDto } from '../../certificates/dto/certificate.dto';
import { FilecoinNodeDto } from '../../filecoin-nodes/dto/filecoin-node.dto';
import { Buyer, Certificate, FilecoinNode, Purchase, Seller } from '@prisma/client';
import { FileMetadataWithUrlDto } from '../../files/dto/file-metadata-with-url.dto';

export type FullPurchaseEntity = Omit<Purchase, 'createdAt' | 'updatedAt'> & {
  seller: Seller,
  buyer: Buyer,
  filecoinNode: FilecoinNode,
  certificate: Certificate,
  redemptionStatement: string,
  attestation: FileMetadataWithUrlDto;
};

export class FullPurchaseDto {
  @ApiProperty({ example: '4bfce36e-3fcd-4a41-b752-94a5298b8eb6' })
  id: string;

  @ApiProperty({ example: '0x8a65e2f074e08dbf23de0e757a63b5aab53fe38109084d1be7e15943263a90d0' })
  txHash: string;

  @ApiProperty({ example: '1000000'})
  recsSoldWh: string;

  @ApiProperty({ example: `${process.env.UI_BASE_URL}/partners/filecoin/purchases/4bfce36e-3fcd-4a41-b752-94a5298b8eb6` })
  pageUrl: string;

  @ApiProperty({ type: SellerDto })
  seller: SellerDto;

  @ApiProperty({ type: BuyerDto })
  buyer: BuyerDto;

  @ApiProperty({ type: CertificateDto })
  certificate: CertificateDto;

  @ApiPropertyOptional({ example: '2020-01-01T00:00:00.000Z' })
  reportingStart: Date;

  @ApiPropertyOptional({ example: 180 })
  reportingStartTimezoneOffset;

  @ApiPropertyOptional({ example: '2020-12-31T23:59:59.999Z' })
  reportingEnd: Date;

  @ApiPropertyOptional({ example: 180 })
  reportingEndTimezoneOffset;

  @ApiProperty({ example: 'Decarbonizing Filecoin Mining Operation' })
  purpose: string;

  @ApiProperty({ example: 'Some Corp Ltd.' })
  beneficiary: string;

  @ApiProperty({ type: FilecoinNodeDto })
  filecoinNode: FilecoinNodeDto;

  @ApiProperty({ type: String })
  redemptionStatement: string;

  @ApiProperty({ type: FileMetadataWithUrlDto })
  attestation: FileMetadataWithUrlDto;

  @ApiPropertyOptional({ type: String, example: '29e25d61-103a-4710-b03d-ee12df765066' })
  contractId: string;

  constructor(partial: Partial<FullPurchaseDto>) {
    Object.assign(this, partial);
  }

  static toDto(purchase: FullPurchaseEntity): FullPurchaseDto {
    return {
      ...purchase,
      recsSoldWh: purchase.recsSoldWh.toString(),
      buyer: BuyerDto.toDto(purchase.buyer),
      seller: new SellerDto(purchase.seller),
      certificate: CertificateDto.toDto(purchase.certificate),
      pageUrl: `${process.env.UI_BASE_URL}/partners/filecoin/purchases/${purchase.id}`,
      filecoinNode: purchase.filecoinNode,
      attestation: FileMetadataWithUrlDto.toDto(purchase.attestation),
      contractId: purchase.contractId,
    };
  }
}
