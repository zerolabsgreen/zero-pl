import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindSellerByNameDto {
  @ApiProperty({ example: 'Monsoon Carbon' })
  @IsString()
  name: string;
}
