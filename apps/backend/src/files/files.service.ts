import { Injectable, Logger } from '@nestjs/common';
import { FilesOnPurchases, FileType, File } from '@prisma/client';
// This is a hack to make Multer available in the Express namespace
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PrismaService } from "../prisma/prisma.service";
import { PaginatedDto } from '../utils/paginated.dto';
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
        purchases: purchaseIds?.length > 0 ? {
          create: purchaseIds.map((id) => ({
            purchase: {
              connect: {
                id,
              },
            },
            fileType
          }))
        } : undefined
      },
      include: {
        purchases: true
      }
    });

    delete newRecord['content'];

    return FileMetadataDto.toDto(newRecord);
  }

  async findAll(query?: {
    skip?: number;
    take?: number;
  }): Promise<PaginatedDto<FileMetadataDto>> {
    const total = await this.prisma.file.count();

    const take = query?.take || total;
    const skip = query?.skip || 0;

    const rows = await this.prisma.file.findMany({
      skip,
      take,
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        fileName: true,
        mimeType: true,
        createdAt: true,
        updatedAt: true,
        purchases: true,
      }
    });

    return {
      data: (rows).map(r => FileMetadataDto.toDto(r)),
      total,
      count: rows.length
    };
  }

  async findOne(id: string): Promise<FileMetadataDto> {
    const file = await this.prisma.file.findUnique({
      where: { id },
      include: { purchases: true }
    });

    return FileMetadataDto.toDto(file);
  }

  async findOneRaw(id: string): Promise<File & { purchases: FilesOnPurchases[]; }> {
    return await this.prisma.file.findUnique({
      where: { id },
      include: { purchases: true }
    });
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.file.delete({ where: { id } });

    return true
  }
}
