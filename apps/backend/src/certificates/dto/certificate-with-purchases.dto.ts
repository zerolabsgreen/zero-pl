import { ApiProperty } from '@nestjs/swagger';
import { Certificate, Purchase } from '@prisma/client';
import { PurchaseDto } from '../../purchases/dto/purchase.dto';
import { CertificateDto } from './certificate.dto';

export class CertificateWithPurchasesDto extends CertificateDto {
  @ApiProperty({ type: [PurchaseDto] })
  purchases: PurchaseDto[];

  static toDto(dbEntity: Certificate & { purchase: Purchase[]}): CertificateWithPurchasesDto {
    const { purchase, ...certificate } = dbEntity;
    return {
      ...CertificateDto.toDto(certificate),
      purchases: purchase.map((p) => PurchaseDto.toDto(p))
    };
  }
}
