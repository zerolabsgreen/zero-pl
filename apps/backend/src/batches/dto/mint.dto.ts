import { ApiProperty } from '@nestjs/swagger';

export class MintDto {
  @ApiProperty({ type: [String], example: ['863d48bb-15da-4eaf-8040-b6cb66e22023'] })
  certificateIds: string[];
}
