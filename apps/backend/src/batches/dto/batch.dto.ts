import { ApiProperty } from '@nestjs/swagger';
import { Certificate, Batch } from '@prisma/client';
import { BigNumber } from 'ethers';
import { CertificateDto } from '../../certificates/dto/certificate.dto';

export class BatchDto {
  @ApiProperty({ example: '0xb79c048b1d44e146925cf55705aa8f84422d7d5e3d858993467c241cad0caf4b' })
  id: string;

  @ApiProperty({ example: 'bafkreigxldrh3lo2spyg424ga4r7srss4f4umm3v7njljod7qvyjtvlg7e' })
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
