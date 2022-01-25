import { Injectable } from '@nestjs/common';
// This is a hack to make Multer available in the Express namespace
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PrismaService } from "../prisma/prisma.service";
import { FileMetadataDto } from "./dto/file-metadata.dto";

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async create(file: Express.Multer.File, purchaseId: string) {
    const newRecord = await this.prisma.file.create({
      data: {
        content: file.buffer,
        fileName: file.originalname,
        mimeType: file.mimetype,
        purchaseId: purchaseId
      }
    })

    return new FileMetadataDto(newRecord);
  }

  async findAll() {
    const rows = await this.prisma.file.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        fileName: true,
        mimeType: true,
        createdAt: true,
        purchaseId: true
      }
    });

    return (rows).map(r => new FileMetadataDto(r));
  }

  findOne(id: string) {
    return this.prisma.file.findUnique({ where: { id } })
  }

  async remove(id: string) {
    return new FileMetadataDto(await this.prisma.file.delete({ where: { id } }))
  }
}
