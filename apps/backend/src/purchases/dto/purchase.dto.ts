import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Purchase } from '@prisma/client';

export class PurchaseDto implements Omit<Purchase, 'reportingStart' | 'reportingEnd'> {
  @ApiProperty({ example: '4bfce36e-3fcd-4a41-b752-94a5298b8eb6' })
  id: string;

  @ApiProperty({ example: '0x8a65e2f074e08dbf23de0e757a63b5aab53fe38109084d1be7e15943263a90d0' })
  txHash: string;

  @ApiProperty({ type: String, example: '68926364-a0ba-4160-b3ea-1ee70c2690dd' })
  sellerId: string;

  @ApiProperty({ type: String, example: '29e25d61-103a-4710-b03d-ee12df765066' })
  buyerId: string;

  @ApiProperty({ type: String, example: '973d48bb-15da-4eaf-8040-b6cb66e22023' })
  certificateId: string;

  @ApiPropertyOptional({ example: '2020-01-01T00:00:00.000Z' })
  reportingStart: string;

  @ApiPropertyOptional({ example: 180 })
  reportingStartTimezoneOffset;

  @ApiPropertyOptional({ example: '2020-12-31T23:59:59.999Z' })
  reportingEnd: string;

  @ApiPropertyOptional({ example: 180 })
  reportingEndTimezoneOffset;

  @ApiProperty()
  createdOn: Date;

  @ApiPropertyOptional({ type: String, example: '29e25d61-103a-4710-b03d-ee12df765066' })
  contractId: string

  constructor(partial: Partial<PurchaseDto>) {
    Object.assign(this, partial);
  }

  static toDto(p: Purchase): PurchaseDto {
    return {
      id: p.id,
      txHash: p.txHash,
      sellerId: p.sellerId,
      buyerId: p.buyerId,
      certificateId: p.certificateId,
      reportingStart: p.reportingStart?.toISOString(), 
      reportingStartTimezoneOffset: p.reportingStartTimezoneOffset,
      reportingEnd: p.reportingEnd?.toISOString(), 
      reportingEndTimezoneOffset: p.reportingEndTimezoneOffset,
      createdOn: p.createdOn,
      contractId: p.contractId,
    };
  }
}
