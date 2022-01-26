import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { ContractDto } from './contract.dto';

export class CreateContractDto extends PartialType(PickType(ContractDto, ['productType', 'energySources', 'region', 'country', 'generationStart', 'generationEnd', 'timezoneOffset', 'openVolume'])) {
  @ApiPropertyOptional({ example: '04a7155d-ced1-4981-8660-48670a0735dd' })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: '29e25d61-103a-4710-b03d-ee12df765066' })
  @IsUUID()
  buyerId: string;

  @ApiProperty({ example: '68926364-a0ba-4160-b3ea-1ee70c2690dd' })
  @IsUUID()
  sellerId: string;

  @ApiPropertyOptional({ example: '68926364-a0ba-4160-b3ea-1ee70c2690dd' })
  @IsOptional()
  @IsUUID()
  filecoinNodeId?: string;
}