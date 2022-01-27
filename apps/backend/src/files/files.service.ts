import { Injectable, Logger } from '@nestjs/common';
import { FileType } from '@prisma/client';
// This is a hack to make Multer available in the Express namespace
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PrismaService } from "../prisma/prisma.service";
import { FileMetadataDto } from "./dto/file-metadata.dto";

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name, { timestamp: true });
  
  constructor(private readonly prisma: PrismaService) {}

  async create(filename: string, buffer: Buffer, purchaseIds: string[], fileType: FileType, mimeType = 'application/pdf'): Promise<FileMetadataDto> {
    const newRecord = await this.prisma.file.create({
      data: {
        content: buffer,
        fileName: filename,
        mimeType: mimeType,
        fileType,
        purchases: {
          create: purchaseIds.map((id) => ({
            purchase: {
              connect: {
                id
              },
            }
          }))
        }
      },
      include: {
        purchases: true
      }
    });

    delete newRecord['content'];

    return FileMetadataDto.toDto(newRecord);
  }

  async findAll(): Promise<FileMetadataDto[]> {
    const rows = await this.prisma.file.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        fileName: true,
        mimeType: true,
        createdAt: true,
        purchases: true,
        fileType: true
      }
    });

    return (rows).map(r => FileMetadataDto.toDto(r));
  }

  async findOne(id: string): Promise<FileMetadataDto> {
    const file = await this.prisma.file.findUnique({
      where: { id },
      include: { purchases: true }
    });

    return FileMetadataDto.toDto(file);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.file.delete({ where: { id } });

    return true
  }
}
