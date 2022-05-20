import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SetRedemptionStatementDto {
  @ApiProperty({ example: '863d48bb-15da-4eaf-8040-b6cb66e22023' })
  @IsUUID()
  redemptionStatementId: string;
}
