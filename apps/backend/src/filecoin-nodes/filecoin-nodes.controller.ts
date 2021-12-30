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
import { FilecoinNodesService, transactionsSchema } from './filecoin-nodes.service';
import { CreateFilecoinNodeDto } from './dto/create-filecoin-node.dto';
import { UpdateFilecoinNodeDto } from './dto/update-filecoin-node.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { FilecoinNodeDto } from "./dto/filecoin-node.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('/partners/filecoin/nodes')
@ApiTags('Filecoin nodes')
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class FilecoinNodesController {
  constructor(private readonly filecoinNodesService: FilecoinNodesService) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiCreatedResponse({ type: FilecoinNodeDto })
  create(@Body() createFilecoinNodeDto: CreateFilecoinNodeDto) {
    return this.filecoinNodesService.create(createFilecoinNodeDto);
  }

  @Get()
  @ApiOkResponse({ type: [FilecoinNodeDto] })
  findAll() {
    return this.filecoinNodesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: FilecoinNodeDto })
  findOne(@Param('id') id: string) {
    return this.filecoinNodesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: FilecoinNodeDto })
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  update(@Param('id') id: string, @Body() updateFilecoinNodeDto: UpdateFilecoinNodeDto) {
    return this.filecoinNodesService.update(id, updateFilecoinNodeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: FilecoinNodeDto })
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  remove(@Param('id') id: string) {
    return this.filecoinNodesService.remove(id);
  }

  @Get(':id/transactions')
  @ApiOkResponse({ schema: transactionsSchema })
  getTransactions(@Param('id') id: string) {
    return this.filecoinNodesService.getTransactions(id);
  }
}
