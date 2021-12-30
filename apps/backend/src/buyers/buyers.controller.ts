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

@Controller('/partners/filecoin/buyers')
@ApiTags('Filecoin buyers')
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiCreatedResponse({ type: BuyerDto })
  create(@Body() createBuyerDto: CreateBuyerDto) {
    return this.buyersService.create(createBuyerDto);
  }

  @Get()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiOkResponse({ type: [BuyerDto] })
  findAll() {
    return this.buyersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BuyerDto })
  findOne(@Param('id') id: string) {
    return this.buyersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiOkResponse({ type: BuyerDto })
  update(@Param('id') id: string, @Body() updateBuyerDto: UpdateBuyerDto) {
    return this.buyersService.update(id, updateBuyerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiOkResponse({ type: BuyerDto })
  remove(@Param('id') id: string) {
    return this.buyersService.remove(id);
  }
}
