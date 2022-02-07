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
import { BuyersService } from './buyers.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { BuyerDto } from "./dto/buyer.dto";
import { AuthGuard } from "@nestjs/passport";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { ApiKeyPermissionsGuard } from '../guards/apikey-permissions.guard';
import { ApiKeyPermissions } from '@prisma/client';

@Controller('/partners/filecoin/buyers')
@ApiTags('Filecoin buyers')
@ApiSecurity('api-key', ['api-key'])
@UseGuards(AuthGuard('api-key'))
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  @Post()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiCreatedResponse({ type: BuyerDto })
  create(@Body() createBuyerDto: CreateBuyerDto): Promise<BuyerDto> {
    return this.buyersService.create(createBuyerDto);
  }

  @Get()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: [BuyerDto] })
  findAll(): Promise<BuyerDto[]> {
    return this.buyersService.findAll();
  }

  @Get(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.PUBLIC, ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: BuyerDto })
  findOne(@Param('id') id: string): Promise<BuyerDto> {
    return this.buyersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  @ApiOkResponse({ type: BuyerDto })
  update(@Param('id') id: string, @Body() updateBuyerDto: UpdateBuyerDto): Promise<BuyerDto> {
    return this.buyersService.update(id, updateBuyerDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.DELETE]))
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.buyersService.remove(id);
  }
}
