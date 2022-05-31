import { ApiProperty } from '@nestjs/swagger';
import { Certificate, Batch } from '@prisma/client';
import { BigNumber } from 'ethers';
import { CertificateDto } from '../../certificates/dto/certificate.dto';

export class BatchDto {
  @ApiProperty({ example: '973d48bb-15da-4eaf-8040-b6cb66e22023' })
  id: string;

  @ApiProperty({ example: '863d48bb-15da-4eaf-8040-b6cb66e22023' })
  redemptionStatementId: string;

  @ApiProperty({ example: 100e6.toString() })
  totalVolume: string;

  @ApiProperty({ example: 50e6.toString() })
  mintedVolume: string;

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
      totalVolume: dbEntity.totalVolume?.toString(),
      mintedVolume: dbEntity.certificates.reduce(
        (total, certificate) => 
          total.add(BigNumber.from(certificate.energyWh)), 
          BigNumber.from(0)
      ).toString(),
      certificates: dbEntity.certificates.map(c => CertificateDto.toDto(c))
    };
  }
}
