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
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeyPermissions } from '@prisma/client';

import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { FileMetadataDto } from '../files/dto/file-metadata.dto';
import { FullPurchaseDto } from './dto/full-purchase.dto';
import { ShortPurchaseDto } from './dto/short-purchase.dto';
import { GenerateAttestationsDto } from './dto/generate-attestations.dto';
import { ApiKeyPermissionsGuard } from '../guards/apikey-permissions.guard';
import { PaginatedDto } from '../utils/paginated.dto';
import { PurchaseEventDTO } from './dto/purchase-event.dto';

@Controller('/partners/filecoin/purchases')
@ApiTags('Filecoin purchases')
@UseGuards(AuthGuard('api-key'))
@ApiSecurity('api-key', ['api-key'])
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiBody({ type: [CreatePurchaseDto] })
  @ApiCreatedResponse({
      type: [FullPurchaseDto],
      description: 'Creates purchases'
  })
  create(@Body(new ParseArrayPipe({ items: CreatePurchaseDto })) createPurchaseDtos: CreatePurchaseDto[]): Promise<FullPurchaseDto[]> {
    return this.purchasesService.create(createPurchaseDtos);
  }

  @Get()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: [PaginatedDto] })
  @ApiQuery({ name: 'skip', type: String, required: false })
  @ApiQuery({ name: 'take', type: String, required: false })
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string
  ): Promise<PaginatedDto<ShortPurchaseDto>> {
    return this.purchasesService.findAll({ skip: Number(skip), take: Number(take) });
  }

  @Get(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.PUBLIC, ApiKeyPermissions.READ]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: FullPurchaseDto })
  findOne(@Param('id') id: string): Promise<FullPurchaseDto> {
    return this.purchasesService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchasesService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.DELETE]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.purchasesService.remove(id);
  }

  @Get(':id/blockchain-events')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.PUBLIC, ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: [PurchaseEventDTO] })
  @ApiParam({ name: 'id', type: String })
  async getBlockchainEvents(@Param('id') id: string): Promise<PurchaseEventDTO[]> {
    return this.purchasesService.getChainEvents(id);
  }

  @Post('/generate/attestations')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiBody({ type: GenerateAttestationsDto })
  @ApiCreatedResponse({ type: [FileMetadataDto] })
  generateAttestations(@Body() { purchaseIds, }: GenerateAttestationsDto): Promise<FileMetadataDto[]> {
    return this.purchasesService.createAttestationForPurchases(purchaseIds);
  }
}
