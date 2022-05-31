import { ApiProperty } from '@nestjs/swagger';
import { Expose } from "class-transformer";
import { FileMetadataDto } from './file-metadata.dto';

export class FileMetadataWithUrlDto extends FileMetadataDto {
  @ApiProperty({ example: `${process.env.FILES_BASE_URL}/29e25d61-103a-4710-b03d-ee12df765066` })
  @Expose()
  url: string;
}
