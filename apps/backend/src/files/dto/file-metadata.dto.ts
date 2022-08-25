import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from "class-transformer";
import { File } from '@prisma/client'
import { PartialBy } from '../../utils/types';

@Exclude()
export class FileMetadataDto implements Omit<File, 'content' | 'createdAt' | 'updatedAt'> {
  @ApiProperty({ example: '5ff1cb39-da8b-4f0a-a17d-a5d00ea85a60' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'certificate.pdf' })
  @Expose()
  fileName: string;

  @ApiProperty({ example: 'application/pdf' })
  @Expose()
  mimeType: string;

  constructor(partial: Partial<FileMetadataDto>) {
    Object.assign(this, partial);
  }

  static toDto(dbEntity: Omit<File, 'content' | 'createdAt' | 'updatedAt'>): FileMetadataDto {
    return {
      id: dbEntity.id,
      fileName: dbEntity.fileName,
      mimeType: dbEntity.mimeType
    };
  }
}
