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
  ValidationPipe
} from '@nestjs/common';
import { FilecoinNodesService, transactionsSchema } from './filecoin-nodes.service';
import { CreateFilecoinNodeDto } from './dto/create-filecoin-node.dto';
import { UpdateFilecoinNodeDto } from './dto/update-filecoin-node.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { FilecoinNodeDto } from "./dto/filecoin-node.dto";
import { AuthGuard } from "@nestjs/passport";
import { FilecoinNodeWithContractsDto } from './dto/filecoin-node-with-contracts.dto';
import { ApiKeyPermissionsGuard } from '../guards/apikey-permissions.guard';
import { ApiKeyPermissions } from '@prisma/client';
import { PaginatedDto } from '../utils/paginated.dto';

@Controller('/partners/filecoin/nodes')
@ApiTags('Filecoin nodes')
@UseGuards(AuthGuard('anonymous'))
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class FilecoinNodesController {
  constructor(private readonly filecoinNodesService: FilecoinNodesService) {}

  @Post()
  @ApiSecurity('api-key', ['api-key'])
  @UseGuards(AuthGuard('api-key'), ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiCreatedResponse({ type: FilecoinNodeDto })
  create(@Body() createFilecoinNodeDto: CreateFilecoinNodeDto): Promise<FilecoinNodeDto> {
    return this.filecoinNodesService.create(createFilecoinNodeDto);
  }

  @Get()
  @ApiOkResponse({ type: [PaginatedDto] })
  @ApiQuery({ name: 'skip', type: String, required: false })
  @ApiQuery({ name: 'take', type: String, required: false })
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string
  ): Promise<PaginatedDto<FilecoinNodeDto>> {
    return this.filecoinNodesService.findAll({ skip: Number(skip), take: Number(take) });
  }

  @Get(':id')
  @ApiSecurity('api-key', ['api-key'])
  @UseGuards(AuthGuard('api-key'), ApiKeyPermissionsGuard([ApiKeyPermissions.PUBLIC, ApiKeyPermissions.READ]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: FilecoinNodeDto })
  findOne(@Param('id') id: string): Promise<FilecoinNodeDto> {
    return this.filecoinNodesService.findOne(id);
  }

  @Get(':id/contracts')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: FilecoinNodeWithContractsDto })
  findOneWithContracts(@Param('id') id: string): Promise<FilecoinNodeWithContractsDto> {
    return this.filecoinNodesService.findOneWithContracts(id);
  }

  @Patch(':id')
  @ApiSecurity('api-key', ['api-key'])
  @ApiOkResponse({ type: FilecoinNodeDto })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(AuthGuard('api-key'), ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  update(@Param('id') id: string, @Body() updateFilecoinNodeDto: UpdateFilecoinNodeDto): Promise<FilecoinNodeDto> {
    return this.filecoinNodesService.update(id, updateFilecoinNodeDto);
  }

  @Delete(':id')
  @ApiSecurity('api-key', ['api-key'])
  @UseGuards(AuthGuard('api-key'), ApiKeyPermissionsGuard([ApiKeyPermissions.DELETE]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.filecoinNodesService.remove(id);
  }

  @Get(':id/transactions')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ schema: transactionsSchema })
  getTransactions(@Param('id') id: string) {
    return this.filecoinNodesService.getTransactions(id);
  }
}
