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
import { ApiOkResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { SellerDto } from "./dto/seller.dto";
import { AuthGuard } from "@nestjs/passport";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";

@Controller('/partners/filecoin/sellers')
@ApiTags('Filecoin sellers')
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  create(@Body() createSellerDto: CreateSellerDto): Promise<SellerDto> {
    return this.sellersService.create(createSellerDto);
  }

  @Get()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiOkResponse({ type: [SellerDto] })
  findAll(): Promise<SellerDto[]> {
    return this.sellersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SellerDto })
  findOne(@Param('id') id: string): Promise<SellerDto> {
    return this.sellersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto): Promise<SellerDto> {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.sellersService.remove(id);
  }
}
