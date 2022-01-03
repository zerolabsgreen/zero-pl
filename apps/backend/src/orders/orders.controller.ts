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
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { OrderDto } from "./dto/order.dto";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { ConfirmOrderDto } from './dto/confirm-order.dto';

@Controller('orders')
@ApiTags('Orders')
@UsePipes(new ValidationPipe({whitelist: true}))
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({ type: OrderDto })
  create(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
    return this.ordersService.create(createOrderDto);
  }

  @Put(':id/confirmations')
  @ApiOkResponse({ type: OrderDto })
  confirm(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() confirmOrderDto: ConfirmOrderDto
  ): Promise<OrderDto> {
    return this.ordersService.confirm(id, confirmOrderDto);
  }

  @Get()
  @ApiOkResponse({ type: [OrderDto] })
  findAll(): Promise<OrderDto[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderDto })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.ordersService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
