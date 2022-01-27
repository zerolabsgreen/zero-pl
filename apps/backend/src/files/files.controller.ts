import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { FileMetadataDto } from "./dto/file-metadata.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express, Response } from 'express';
import * as multer from 'multer';
import { AuthGuard } from "@nestjs/passport";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { FileType } from '@prisma/client';

@Controller('files')
@ApiTags('files')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class FilesController {
  private readonly logger = new Logger(FilesController.name, { timestamp: true });

  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
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
    console.log({ dto })
    this.logger.debug(`file uploaded ${JSON.stringify({ ...file, buffer: undefined })}`);
    return this.filesService.create(file.originalname, file.buffer, dto.purchaseIds.split(','), dto.fileType as FileType, file.mimetype);
  }

  @Get()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiOkResponse({ type: [FileMetadataDto] })
  @UseInterceptors(NoDataInterceptor)
  findAll(): Promise<FileMetadataDto[]> {
    return this.filesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'binary file content' })
  async getFileContent(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const file = await this.filesService.findOne(id);

    if (!file) {
      throw new NotFoundException();
    }

    res.setHeader('Content-Disposition', `Attachment; filename=${file.fileName}`);
    res.setHeader('Content-Type', file.mimeType);

    res.send(file.content);
  }

  @Get(':id/metadata')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
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
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiOkResponse({ type: Boolean })
  @UseInterceptors(NoDataInterceptor)
  remove(@Param('id') id: string): Promise<boolean> {
    return this.filesService.remove(id);
  }
}
