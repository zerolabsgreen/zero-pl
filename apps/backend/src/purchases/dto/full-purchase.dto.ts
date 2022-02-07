import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { FileMetadataDto } from '../../files/dto/file-metadata.dto';
import { BuyerDto } from '../../buyers/dto/buyer.dto';
import { SellerDto } from '../../sellers/dto/seller.dto';
import { CertificateDto } from '../../certificates/dto/certificate.dto';
import { FilecoinNodeDto } from '../../filecoin-nodes/dto/filecoin-node.dto';
import { Buyer, Certificate, FilecoinNode, Purchase, Seller } from '@prisma/client';

class File extends PartialType(PickType(FileMetadataDto, ['id', 'fileName', 'mimeType'] as const)) {
  @ApiProperty({ example: `${process.env.API_BASE_URL}/api/files/5ff1cb39-da8b-4f0a-a17d-a5d00ea85a60` })
  url: string;
}

export type FullPurchaseEntity = Purchase & {
  seller: Seller,
  buyer: Buyer,
  filecoinNodes: FilecoinNode[],
  certificate: Certificate,
  files: any
};

export class FullPurchaseDto {
  @ApiProperty({ example: '4bfce36e-3fcd-4a41-b752-94a5298b8eb6' })
  id: string;

  @ApiProperty({ example: '0x8a65e2f074e08dbf23de0e757a63b5aab53fe38109084d1be7e15943263a90d0' })
  txHash: string;

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

  @ApiProperty({ type: [FilecoinNodeDto] })
  filecoinNodes: FilecoinNodeDto[];

  @ApiProperty({ type: [File] })
  files: File[];

  constructor(partial: Partial<FullPurchaseDto>) {
    Object.assign(this, partial);
  }

  static toDto(purchase: FullPurchaseEntity): FullPurchaseDto {
    return {
      ...purchase,
      buyer: BuyerDto.toDto(purchase.buyer),
      seller: new SellerDto(purchase.seller),
      certificate: CertificateDto.toDto(purchase.certificate),
      pageUrl: `${process.env.UI_BASE_URL}/partners/filecoin/purchases/${purchase.id}`,
      files: purchase.files.map(f => ({ ...f.file, url: `${process.env.FILES_BASE_URL}/${f.file.id}` })),
      filecoinNodes: purchase.filecoinNodes
    };
  }
}
