import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Validate } from 'class-validator';
import { PositiveBNStringValidator } from '../../utils/positiveBNStringValidator';
import { ContractDto } from './contract.dto';

export class CreateContractDto extends PartialType(PickType(ContractDto, [
  'productType',
  'energySources',
  'region',
  'country',
  'contractDate',
  'deliveryDate',
  'reportingStart',
  'reportingEnd',
  'timezoneOffset'
])) {
  @ApiPropertyOptional({ example: '04a7155d-ced1-4981-8660-48670a0735dd' })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({ description: 'Volume in Wh', example: 4e12.toString() })
  @Validate(PositiveBNStringValidator)
  volume: string;

  @ApiProperty({ example: '29e25d61-103a-4710-b03d-ee12df765066' })
  @IsUUID()
  buyerId: string;

  @ApiProperty({ example: '68926364-a0ba-4160-b3ea-1ee70c2690dd' })
  @IsUUID()
  sellerId: string;

  @ApiPropertyOptional({ example: 'f00001' })
  @IsOptional()
  @IsString()
  filecoinNodeId?: string;
}
