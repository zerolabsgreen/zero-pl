import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { OrderDto } from "./dto/order.dto";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { ConfirmOrderDto } from './dto/confirm-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeyPermissionsGuard } from '../guards/apikey-permissions.guard';
import { ApiKeyPermissions } from '@prisma/client';

@Controller('orders')
@ApiTags('Orders')
@UseGuards(AuthGuard('api-key'))
@ApiSecurity('api-key', ['api-key'])
@UsePipes(new ValidationPipe({whitelist: true}))
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiCreatedResponse({ type: OrderDto })
  create(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
    return this.ordersService.create(createOrderDto);
  }

  @Put(':id/confirmations')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: OrderDto })
  confirm(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() confirmOrderDto: ConfirmOrderDto
  ): Promise<OrderDto> {
    return this.ordersService.confirm(id, confirmOrderDto);
  }

  @Get()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: [OrderDto] })
  findAll(): Promise<OrderDto[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: OrderDto })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id: string) {
    return this.ordersService.update(+id);
  }

  @Delete(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.DELETE]))
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
