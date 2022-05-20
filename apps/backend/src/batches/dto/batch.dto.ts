import { ApiProperty } from '@nestjs/swagger';
import { Certificate, Batch } from '@prisma/client';
import { CertificateDto } from '../../certificates/dto/certificate.dto';

export class BatchDto {
  @ApiProperty({ example: '973d48bb-15da-4eaf-8040-b6cb66e22023' })
  id: string;

  @ApiProperty({ example: '863d48bb-15da-4eaf-8040-b6cb66e22023' })
  redemptionStatementId: string;

  @ApiProperty({ type: [CertificateDto] })
  certificates: CertificateDto[];

  constructor(partial: Partial<BatchDto>) {
    Object.assign(this, partial);
  }

  static toDto(
    dbEntity: Batch & { certificates: Certificate[] }
  ): BatchDto {
    return {
      ...dbEntity,
      id: dbEntity.id?.toString() ?? undefined,
      certificates: dbEntity.certificates.map(c => CertificateDto.toDto(c))
    };
  }
}