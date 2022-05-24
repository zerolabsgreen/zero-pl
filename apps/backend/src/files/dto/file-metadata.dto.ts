import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from "class-transformer";
import { File, FilesOnPurchases, FileType } from '@prisma/client'

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

@Exclude()
export class FileMetadataDto implements File {
  @ApiProperty({ example: '5ff1cb39-da8b-4f0a-a17d-a5d00ea85a60' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'certificate.pdf' })
  @Expose()
  fileName: string;

  @ApiProperty({ example: 'application/pdf' })
  @Expose()
  mimeType: string;

  @ApiProperty( { example: "2021-08-26T18:20:30.633Z" })
  @Expose()
  createdAt: Date;

  @ApiProperty( { example: "2021-08-26T18:20:30.633Z" })
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  purchases: string[];

  @ApiProperty({ example: FileType.ATTESTATION })
  @Expose()
  fileType: FileType;

  constructor(partial: Partial<FileMetadataDto>) {
    Object.assign(this, partial);
  }

  static toDto(dbEntity: PartialBy<File, 'content'> & { purchases: FilesOnPurchases[] }): FileMetadataDto {
    return {
      id: dbEntity.id,
      fileName: dbEntity.fileName,
      mimeType: dbEntity.mimeType,
      createdAt: dbEntity.createdAt,
      updatedAt: dbEntity.updatedAt,
      purchases: dbEntity.purchases?.map(p => p.purchaseId) ?? undefined,
      fileType: dbEntity.purchases?.pop()?.fileType ?? undefined
    };
  }
}
