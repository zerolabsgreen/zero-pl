import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateFileMetadataDto {
  @ApiProperty({ example: '3fc9c8da-4b6f-4976-be25-facfd13c5787' })
  @IsUUID()
  purchaseId: string;

  constructor(partial: Partial<UpdateFileMetadataDto>) {
    Object.assign(this, partial);
  }
}
