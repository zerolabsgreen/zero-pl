import { CertificateDto } from './certificate.dto';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import {
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsDatetimePrismaCompatible } from '../../validators'

export class CreateCertificateDto extends OmitType(CertificateDto, ['txHash']) {
  @ApiPropertyOptional({ example: '973d48bb-15da-4eaf-8040-b6cb66e22023' })
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiPropertyOptional({ example: 'Solar 1 - Non Bua Lampon' })
  @IsOptional()
  @IsString()
  generatorName: string;

  @ApiPropertyOptional({ example: 'NA' })
  @IsOptional()
  @IsString()
  generatorId: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  initialSellerId: string;

  @ApiPropertyOptional({ example: 'NE' })
  @IsString()
  @IsOptional()
  region: string;

  @ApiProperty({ example: 'China' })
  @IsString()
  country: string;

  @ApiProperty({ example: 'Wind' })
  @IsString()
  energySource: string;

  @ApiProperty({ example: new Date('2020-11-01T00:00:00.000Z') })
  @IsISO8601({ strict: true })
  @IsDatetimePrismaCompatible()
  generationStart: string;

  @ApiPropertyOptional({ example: 180 })
  @IsInt()
  @IsOptional()
  generationStartTimezoneOffset: number;

  @ApiProperty({ example: new Date('2021-06-01T23:59:59.999Z') })
  @IsISO8601({ strict: true })
  @IsDatetimePrismaCompatible()
  generationEnd: string;

  @ApiPropertyOptional({ example: 180 })
  @IsInt()
  @IsOptional()
  generationEndTimezoneOffset: number;

  @ApiProperty({ type: 'string', example: '10000' })
  @IsNumberString()
  energy: string
}
