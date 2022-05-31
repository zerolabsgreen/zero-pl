import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CertificateDto } from "./dto/certificate.dto";
import { AuthGuard } from "@nestjs/passport";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { ApiKeyPermissionsGuard } from '../guards/apikey-permissions.guard';
import { ApiKeyPermissions } from '@prisma/client';
import { PaginatedDto } from '../utils/paginated.dto';
import { CertificateWithPurchasesDto } from './dto/certificate-with-purchases.dto';

@Controller('/partners/filecoin/certificates')
@ApiTags('Filecoin certificates')
@UseGuards(AuthGuard('api-key'))
@ApiSecurity('api-key', ['api-key'])
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiBody({ type: [CreateCertificateDto] })
  @ApiCreatedResponse({
      type: [CertificateDto],
      description: 'Creates certificates'
  })
  create(@Body(new ParseArrayPipe({ items: CreateCertificateDto })) createCertificateDtos: CreateCertificateDto[]) {
    return this.certificatesService.create(createCertificateDtos);
  }

  @Get()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: [PaginatedDto] })
  @ApiQuery({ name: 'skip', type: String, required: false })
  @ApiQuery({ name: 'take', type: String, required: false })
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string
  ): Promise<PaginatedDto<CertificateDto>>  {
    return this.certificatesService.findAll({ skip: Number(skip), take: Number(take) });
  }

  @Get(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: CertificateDto })
  findOne(@Param('id') id: string) {
    return this.certificatesService.findOne(id);
  }

  @Get(':id/purchases')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: CertificateWithPurchasesDto })
  findOneWithPurchases(@Param('id') id: string) {
    return this.certificatesService.findOneWithPurchases(id);
  }

  @Patch(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  @ApiOkResponse({ type: CertificateDto })
  update(@Param('id') id: string, @Body() updateCertificateDto: UpdateCertificateDto): Promise<CertificateDto> {
    return this.certificatesService.update(id, updateCertificateDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.DELETE]))
  remove(@Param('id') id: string) {
    return this.certificatesService.remove(id);
  }
}
