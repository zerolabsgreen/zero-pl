import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { purchaseEventsSchema } from './purchases.service';
import { FileMetadataDto } from '../files/dto/file-metadata.dto';
import { FullPurchaseDto } from './dto/full-purchase.dto';
import { ShortPurchaseDto } from './dto/short-purchase.dto';
import { GenerateAttestationsDto } from './dto/generate-attestations.dto';

@Controller('/partners/filecoin/purchases')
@ApiTags('Filecoin purchases')
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiBody({ type: [CreatePurchaseDto] })
  @ApiCreatedResponse({
      type: [FullPurchaseDto],
      description: 'Creates purchases'
  })
  create(@Body() createPurchaseDtos: CreatePurchaseDto[]): Promise<FullPurchaseDto[]> {
    return this.purchasesService.create(createPurchaseDtos);
  }

  @Get()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiOkResponse({ type: ShortPurchaseDto })
  @ApiOkResponse({ type: [ShortPurchaseDto] })
  findAll(): Promise<ShortPurchaseDto[]> {
    return this.purchasesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: FullPurchaseDto })
  findOne(@Param('id') id: string): Promise<FullPurchaseDto> {
    return this.purchasesService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchasesService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.purchasesService.remove(id);
  }

  @Get(':id/blockchain-events')
  @ApiOkResponse({ schema: purchaseEventsSchema })
  @ApiParam({ name: 'id', type: String })
  async getBlockchainEvents(@Param('id') id: string) {
    return this.purchasesService.getChainEvents(id);
  }

  @Post('/generate/attestations')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiBody({ type: GenerateAttestationsDto })
  @ApiCreatedResponse({ type: [FileMetadataDto] })
  generateAttestations(@Body() { purchaseIds, }: GenerateAttestationsDto): Promise<FileMetadataDto[]> {
    return this.purchasesService.createAttestationForPurchases(purchaseIds);
  }
}
