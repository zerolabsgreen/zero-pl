import { ApiProperty } from '@nestjs/swagger';
import { Expose } from "class-transformer";
import { File } from '@prisma/client'
import { PartialBy } from '../../utils/types';
import { FileMetadataDto } from './file-metadata.dto';

export class FileMetadataWithUrlDto extends FileMetadataDto {
  @ApiProperty({ example: `${process.env.FILES_BASE_URL}/29e25d61-103a-4710-b03d-ee12df765066` })
  @Expose()
  url: string;

  static toDto(dbEntity: PartialBy<File, 'content'> & { url: string }): FileMetadataWithUrlDto {
    return {
      id: dbEntity.id,
      fileName: dbEntity.fileName,
      mimeType: dbEntity.mimeType,
      createdAt: dbEntity.createdAt,
      updatedAt: dbEntity.updatedAt,
      url: dbEntity.url
    };
  }
}
