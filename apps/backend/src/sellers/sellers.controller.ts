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
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { SellerDto } from "./dto/seller.dto";
import { AuthGuard } from "@nestjs/passport";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { ApiKeyPermissionsGuard } from '../guards/apikey-permissions.guard';
import { ApiKeyPermissions } from '@prisma/client';

@Controller('/partners/filecoin/sellers')
@ApiTags('Filecoin sellers')
@UseGuards(AuthGuard('api-key'))
@ApiSecurity('api-key', ['api-key'])
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiBody({ type: CreateSellerDto })
  @ApiCreatedResponse({ type: SellerDto })
  create(@Body() createSellerDto: CreateSellerDto): Promise<SellerDto> {
    return this.sellersService.create(createSellerDto);
  }

  @Get()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: [SellerDto] })
  findAll(): Promise<SellerDto[]> {
    return this.sellersService.findAll();
  }

  @Get(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: SellerDto })
  findOne(@Param('id') id: string): Promise<SellerDto> {
    return this.sellersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto): Promise<SellerDto> {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.DELETE]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.sellersService.remove(id);
  }
}
