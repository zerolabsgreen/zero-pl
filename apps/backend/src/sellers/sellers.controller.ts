import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  NotFoundException
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { SellerDto } from "./dto/seller.dto";
import { AuthGuard } from "@nestjs/passport";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { ApiKeyPermissionsGuard } from '../guards/apikey-permissions.guard';
import { ApiKeyPermissions } from '@prisma/client';
import { PaginatedDto } from '../utils/paginated.dto';
import { FindSellerByNameDto } from './dto/find-seller-by-name.dto';

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

  @Post('/findByName')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiBody({ type: FindSellerByNameDto })
  @ApiCreatedResponse({ type: SellerDto })
  async findByName(@Body('name') name: string): Promise<SellerDto> {
    const seller = await this.sellersService.findByName(name);

    if (!seller) {
      throw new NotFoundException('Seller was not found');
    }

    return seller;
  }

  @Get()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: [PaginatedDto] })
  @ApiQuery({ name: 'skip', type: String, required: false })
  @ApiQuery({ name: 'take', type: String, required: false })
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string
  ): Promise<PaginatedDto<SellerDto>> {
    return this.sellersService.findAll({ skip: Number(skip), take: Number(take) });
  }

  @Get(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.PUBLIC, ApiKeyPermissions.READ]))
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

  @Patch(':id/blockchain-account')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  @ApiParam({ name: 'id', type: String })
  attachBlockchainAccount(@Param('id') id: string): Promise<SellerDto> {
    return this.sellersService.assignBlockchainAccount(id);
  }

  @Delete(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.DELETE]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.sellersService.remove(id);
  }
}
