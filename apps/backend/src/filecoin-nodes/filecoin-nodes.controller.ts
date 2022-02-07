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
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { FilecoinNodeDto } from "./dto/filecoin-node.dto";
import { AuthGuard } from "@nestjs/passport";
import { FilecoinNodeWithContractsDto } from './dto/filecoin-node-with-contracts.dto';
import { ApiKeyPermissionsGuard } from '../guards/apikey-permissions.guard';
import { ApiKeyPermissions } from '@prisma/client';

@Controller('/partners/filecoin/nodes')
@ApiTags('Filecoin nodes')
@UseGuards(AuthGuard('api-key'))
@ApiSecurity('api-key', ['api-key'])
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class FilecoinNodesController {
  constructor(private readonly filecoinNodesService: FilecoinNodesService) {}

  @Post()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiCreatedResponse({ type: FilecoinNodeDto })
  create(@Body() createFilecoinNodeDto: CreateFilecoinNodeDto): Promise<FilecoinNodeDto> {
    return this.filecoinNodesService.create(createFilecoinNodeDto);
  }

  @Get()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: [FilecoinNodeDto] })
  findAll(): Promise<FilecoinNodeDto[]> {
    return this.filecoinNodesService.findAll();
  }

  @Get(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.PUBLIC, ApiKeyPermissions.READ]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: FilecoinNodeDto })
  findOne(@Param('id') id: string): Promise<FilecoinNodeDto> {
    return this.filecoinNodesService.findOne(id);
  }

  @Get(':id/contracts')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.PUBLIC, ApiKeyPermissions.READ]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: FilecoinNodeWithContractsDto })
  findOneWithContracts(@Param('id') id: string): Promise<FilecoinNodeWithContractsDto> {
    return this.filecoinNodesService.findOneWithContracts(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: FilecoinNodeDto })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  update(@Param('id') id: string, @Body() updateFilecoinNodeDto: UpdateFilecoinNodeDto): Promise<FilecoinNodeDto> {
    return this.filecoinNodesService.update(id, updateFilecoinNodeDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.DELETE]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.filecoinNodesService.remove(id);
  }

  @Get(':id/transactions')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.PUBLIC, ApiKeyPermissions.READ]))
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ schema: transactionsSchema })
  getTransactions(@Param('id') id: string) {
    return this.filecoinNodesService.getTransactions(id);
  }
}
