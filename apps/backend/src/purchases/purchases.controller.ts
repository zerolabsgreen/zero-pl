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
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PurchaseDto } from './dto/purchase.dto';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { purchaseEventsSchema } from './purchases.service';

@Controller('/partners/filecoin/purchases')
@ApiTags('Filecoin purchases')
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto);
  }

  @Get()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiOkResponse({
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", example: "04a7155d-ced1-4981-8660-48670a0735dd" },
          pageUrl: {
            type: "string",
            example: "http://localhost:3000/partners/filecoin/purchases/04a7155d-ced1-4981-8660-48670a0735dd"
          },
          dataUrl: {
            type: "string",
            example: "http://localhost:3000/api/partners/filecoin/purchases/04a7155d-ced1-4981-8660-48670a0735dd"
          }
        }
      }
    }
  })
  findAll() {
    return this.purchasesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PurchaseDto })
  findOne(@Param('id') id: string) {
    return this.purchasesService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchasesService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  remove(@Param('id') id: string) {
    return this.purchasesService.remove(id);
  }

  @Get(':id/blockchain-events')
  @ApiOkResponse({ schema: purchaseEventsSchema })
  async getBlockchainEvents(@Param('id') id: string) {
    return this.purchasesService.getChainEvents(id);
  }
}
