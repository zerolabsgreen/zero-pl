import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Certificate, Purchase } from '@prisma/client';
import { CertificateDto } from '../../certificates/dto/certificate.dto';
import { PurchaseDto } from './purchase.dto';

export type PurchaseWithCertificateEntity = Purchase & { certificate: Certificate; };

export class PurchaseWithCertificateDto extends OmitType(PurchaseDto, ['certificateId']) {
  @ApiProperty({ type: CertificateDto })
  certificate: CertificateDto;

  static toDto(p: PurchaseWithCertificateEntity): PurchaseWithCertificateDto {
    return {
      id: p.id,
      txHash: p.txHash,
      sellerId: p.sellerId,
      buyerId: p.buyerId,
      certificate: CertificateDto.toDto(p.certificate),
      reportingStart: p.reportingStart?.toISOString(), 
      reportingStartTimezoneOffset: p.reportingStartTimezoneOffset,
      reportingEnd: p.reportingEnd?.toISOString(), 
      reportingEndTimezoneOffset: p.reportingEndTimezoneOffset,
      createdOn: p.createdOn,
      contractId: p.contractId,
    };
  }
}
