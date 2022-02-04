import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiKey } from '@prisma/client';

@Injectable()
export class ApiKeysService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ApiKey[]> {
    return this.prisma.apiKey.findMany();
  }

  async findOne(id: string): Promise<ApiKey> {
    return this.prisma.apiKey.findUnique({ where: { id } });
  }
}
