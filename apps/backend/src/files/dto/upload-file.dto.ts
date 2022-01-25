import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '@prisma/client';
import { IsEnum, IsUUID } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: unknown;

  @ApiProperty( { example: "3fc9c8da-4b6f-4976-be25-facfd13c5787" })
  @IsUUID()
  purchaseId: string;

  @ApiProperty( { example: FileType.REDEMPTION_STATEMENT })
  @IsEnum(FileType)
  fileType: FileType;
}
