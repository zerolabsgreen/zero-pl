import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class SetRedemptionStatementDto {
  @ApiProperty({ example: 'bafkreie5lyvlbecjv5skk6mojlqlm2ldfy2xcbslp6b45jz3mc2t42oj5a' })
  @IsString()
  redemptionStatementId: string;

  @ApiProperty({ example: 10e6.toString() })
  @IsNumberString()
  totalVolume: string
}
