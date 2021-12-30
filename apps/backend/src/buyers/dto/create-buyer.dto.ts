import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBuyerDto {
  @ApiPropertyOptional({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiPropertyOptional({ example: '-' })
  @IsString()
  @IsOptional()
  name: string;
}
