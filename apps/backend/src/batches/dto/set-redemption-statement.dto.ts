import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsUUID } from 'class-validator';

export class SetRedemptionStatementDto {
  @ApiProperty({ example: '863d48bb-15da-4eaf-8040-b6cb66e22023' })
  @IsUUID()
  redemptionStatementId: string;

  @ApiProperty({ example: 10e6.toString() })
  @IsNumberString()
  totalVolume: string
}
