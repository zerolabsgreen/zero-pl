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
import { FindContractDto } from './dto/find-contract.dto';
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
  constructor(private readonly contractsService: ContractsService) { }

  @Post()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiBody({ type: [FindContractDto] })
  @ApiCreatedResponse({
    type: [FindContractDto],
    description: 'Creates contracts'
  })
  create(@Body(new ParseArrayPipe({ items: CreateContractDto })) createContractDtos: [CreateContractDto]): Promise<FindContractDto[]> {
    return this.contractsService
      .create(createContractDtos)
      .then((contracts) => contracts.map((contract) => FindContractDto.toDto(contract)));
  }

  @Get()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: [FindContractDto] })
  findAll(): Promise<FindContractDto[]> {
    return this.contractsService.findAll()
      .then((contracts) => contracts.map((contract) => FindContractDto.toDto(contract)));
  }

  @Get(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.PUBLIC, ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: FindContractDto })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string): Promise<FindContractDto> {
    return this.contractsService.findOne(id).then((contract) => {
      return FindContractDto.toDto(contract)
    })
  }

  @Patch(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateContractDto })
  @ApiOkResponse({ type: FindContractDto })
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto): Promise<FindContractDto> {
    return this.contractsService.update(id, updateContractDto).then((contract) => {
      return FindContractDto.toDto(contract)
    });
  }

  @Delete(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.DELETE]))
  @ApiParam({ name: 'id', type: Boolean })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.contractsService.remove(id);
  }
}
