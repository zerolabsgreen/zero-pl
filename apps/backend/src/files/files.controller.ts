import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { FileMetadataDto } from "./dto/file-metadata.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express, Response } from 'express';
import * as multer from 'multer';
import { AuthGuard } from "@nestjs/passport";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { ApiKeyPermissions, FileType } from '@prisma/client';
import { ApiKeyPermissionsGuard } from '../guards/apikey-permissions.guard';
import { PaginatedDto } from '../utils/paginated.dto';

@Controller('files')
@ApiTags('files')
@UseGuards(AuthGuard('api-key'))
@ApiSecurity('api-key', ['api-key'])
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class FilesController {
  private readonly logger = new Logger(FilesController.name, { timestamp: true });

  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        purchaseIds: { type: 'array', items: { type: 'string' } },
        fileType: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({ type: FileMetadataDto })
  @UseInterceptors(NoDataInterceptor, FileInterceptor('file', {
    storage: multer.memoryStorage(),
    limits: {
      fileSize: parseInt(process.env.UPLOADED_FILE_SIZE_LIMIT)
    }
  }))
  create(
    @Body() dto: { fileType: string, purchaseIds: string },
    @UploadedFile() file: Express.Multer.File
  ): Promise<FileMetadataDto> {
    this.logger.debug(`file uploaded ${JSON.stringify({ ...file, buffer: undefined })}`);
    if (!file) {
      throw new BadRequestException(`Please provide a file`);
    }
    return this.filesService.create(file.originalname, file.buffer, dto.purchaseIds?.split(',') ?? [], dto.fileType as FileType, file.mimetype);
  }

  @Get()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: [PaginatedDto] })
  @ApiQuery({ name: 'skip', type: String, required: false })
  @ApiQuery({ name: 'take', type: String, required: false })
  @UseInterceptors(NoDataInterceptor)
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string
  ): Promise<PaginatedDto<FileMetadataDto>> {
    return this.filesService.findAll({ skip: Number(skip), take: Number(take) });
  }

  @Get(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.PUBLIC, ApiKeyPermissions.READ]))
  @ApiOkResponse({ description: 'binary file content' })
  @ApiParam({ name: 'id', type: String })
  async getFileContent(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const file = await this.filesService.findOneRaw(id);

    if (!file) {
      throw new NotFoundException();
    }

    res.setHeader('Content-Disposition', `Attachment; filename=${file.fileName}`);
    res.setHeader('Content-Type', file.mimeType);

    res.send(file.content);
  }

  @Get(':id/metadata')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.PUBLIC, ApiKeyPermissions.READ]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: FileMetadataDto })
  @UseInterceptors(NoDataInterceptor)
  async getFileMetadata(@Param('id') id: string): Promise<FileMetadataDto> {
    const file = await this.filesService.findOne(id);

    if (!file) {
      throw new NotFoundException();
    }

    return new FileMetadataDto(file)
  }

  @Delete(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @UseInterceptors(NoDataInterceptor)
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.filesService.remove(id);
  }
}
