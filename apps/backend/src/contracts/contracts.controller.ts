import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ContractDto } from './dto/contract.dto';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { ApiKeyPermissionsGuard } from '../guards/apikey-permissions.guard';
import { ApiKeyPermissions } from '@prisma/client';

@Controller('/partners/filecoin/contracts')
@ApiTags('Filecoin contracts')
@ApiSecurity('api-key', ['api-key'])
@UseGuards(AuthGuard('api-key'))
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiBody({ type: [CreateContractDto] })
  @ApiCreatedResponse({
      type: [ContractDto],
      description: 'Creates contracts'
  })
  create(@Body(new ParseArrayPipe({ items: CreateContractDto })) createContractDtos: [CreateContractDto]): Promise<ContractDto[]> {
    return this.contractsService.create(createContractDtos);
  }

  @Get()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({type: [ContractDto]})
  findAll(): Promise<ContractDto[]> {
    return this.contractsService.findAll();
  }

  @Get(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: ContractDto })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string): Promise<ContractDto> {
    return this.contractsService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateContractDto })
  @ApiOkResponse({ type: ContractDto })
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto): Promise<ContractDto> {
    return this.contractsService.update(id, updateContractDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.DELETE]))
  @ApiParam({ name: 'id', type: Boolean })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.contractsService.remove(id);
  }
}
