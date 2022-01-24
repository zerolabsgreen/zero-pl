import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: unknown;

  @ApiProperty( { example: "3fc9c8da-4b6f-4976-be25-facfd13c5787" })
  @IsUUID()
  purchaseId: string;
}
