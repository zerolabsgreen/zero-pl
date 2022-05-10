import { ApiProperty } from '@nestjs/swagger';

export class SetRedemptionStatementDto {
  @ApiProperty({ example: '863d48bb-15da-4eaf-8040-b6cb66e22023' })
  redemptionStatementId: string;
}
