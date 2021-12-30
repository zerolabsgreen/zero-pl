import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMimeType, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateFileMetadataDto {
  @ApiPropertyOptional({ example: 'certificate.pdf' })
  @IsString()
  @IsOptional()
  fileName: string;

  @ApiProperty({ example: 'application/pdf' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsMimeType()
  mimeType: string;

  @ApiPropertyOptional({ example: '3fc9c8da-4b6f-4976-be25-facfd13c5787' })
  @IsUUID()
  @IsOptional()
  purchaseId: string;

  constructor(partial: Partial<UpdateFileMetadataDto>) {
    Object.assign(this, partial);
  }
}
