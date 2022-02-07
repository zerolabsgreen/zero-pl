import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '@prisma/client';
import { IsEnum, IsUUID } from 'class-validator';
import { IsStringArrayDistinct } from '../../validators/ArrayDistinct';

export class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: unknown;

  @ApiProperty({ type: 'array', items: { type: 'string' } })
  @IsStringArrayDistinct()
  @IsUUID('all', { each: true })
  purchaseIds: string[];

  @ApiProperty( { example: FileType.REDEMPTION_STATEMENT })
  @IsEnum(FileType)
  fileType: FileType;
}
