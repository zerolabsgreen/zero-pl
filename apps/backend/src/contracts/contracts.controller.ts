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
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ContractDto } from './dto/contract.dto';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';

@Controller('/partners/filecoin/contracts')
@ApiTags('Filecoin contracts')
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiBody({ type: [CreateContractDto] })
  @ApiCreatedResponse({
      type: [ContractDto],
      description: 'Creates contracts'
  })
  create(@Body() createContractDtos: [CreateContractDto]) {
    return this.contractsService.create(createContractDtos);
  }

  @Get()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiOkResponse({type: [ContractDto]})
  findAll() {
    return this.contractsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ContractDto })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateContractDto })
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractsService.update(id, updateContractDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('api-key', ['api-key'])
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.contractsService.remove(id);
  }
}
