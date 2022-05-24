import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsISO8601,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min
} from 'class-validator';
import { IsDatetimePrismaCompatible } from '../../validators';

class RecsAnnuallyDTO {
  @ApiProperty({ example: 2021 })
  @IsInt()
  @Min(2020)
  year: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  amount: number;
}

export class CreatePurchaseDto {
  @ApiProperty({ example: '04a7155d-ced1-4981-8660-48670a0735dd' })
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({ example: '973d48bb-15da-4eaf-8040-b6cb66e22023' })
  @IsUUID()
  certificateId: string;

  @ApiProperty({ example: '1000000'})
  @IsNumberString()
  recsSoldWh: string;

  @ApiProperty({ example: '29e25d61-103a-4710-b03d-ee12df765066' })
  @IsUUID()
  buyerId: string;

  @ApiProperty({ example: '68926364-a0ba-4160-b3ea-1ee70c2690dd' })
  @IsUUID()
  sellerId: string;

  @ApiProperty({ example: '2020-01-01T00:00:00.000Z' })
  @IsISO8601({ strict: true })
  @IsDatetimePrismaCompatible()
  reportingStart: string;

  @ApiPropertyOptional({ example: 180, default: 0 })
  @IsInt()
  @Min(-780)
  @Max(780)
  @IsOptional()
  reportingStartTimezoneOffset?: number;

  @ApiProperty({ example: '2020-12-31T23:59:59.999Z' })
  @IsISO8601({ strict: true })
  @IsDatetimePrismaCompatible()
  reportingEnd: string;

  @ApiPropertyOptional({ example: 180, default: 0 })
  @IsInt()
  @Min(-780)
  @Max(780)
  @IsOptional()
  reportingEndTimezoneOffset?: number;

  @ApiProperty({ type: String })
  @IsString()
  filecoinNodeId: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  contractId?: string;
}
