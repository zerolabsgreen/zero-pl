import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { BatchService } from './batch.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { BatchDto } from "./dto/batch.dto";
import { AuthGuard } from "@nestjs/passport";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { ApiKeyPermissionsGuard } from '../guards/apikey-permissions.guard';
import { ApiKeyPermissions } from '@prisma/client';
import { SetRedemptionStatementDto } from './dto/set-redemption-statement.dto';
import { MintDto } from './dto/mint.dto';

@Controller('/partners/filecoin/certificates')
@ApiTags('Filecoin certificates')
@UseGuards(AuthGuard('api-key'))
@ApiSecurity('api-key', ['api-key'])
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiBody({ type: BatchDto })
  @ApiCreatedResponse({
      type: [BatchDto],
      description: 'Creates certificates'
  })
  create(@Body() batchDto: BatchDto) {
    return this.batchService.create(batchDto);
  }

  @Get()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: [BatchDto] })
  findAll() {
    return this.batchService.findAll();
  }

  @Get(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: BatchDto })
  findOne(@Param('id') id: string) {
    return this.batchService.findOne(id);
  }

  @Patch(':id/redemption-statement')
  @ApiBody({ type: SetRedemptionStatementDto })
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  setRedemptionStatement(
    @Param('id') id: string,
    @Body() dto: SetRedemptionStatementDto
  ) {
    return this.batchService.setRedemptionStatement(id, dto.redemptionStatementId);
  }

  @Patch(':id:/generate-on-chain-id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiOkResponse({ type: Number })
  generateOnChainId(
    @Param('id') id: string,
  ): Promise<number> {
    return this.batchService.generateOnChainId(id);
  }
  
  @Post(':id/mint')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiBody({ type: MintDto })
  @ApiCreatedResponse({
      type: String,
      description: 'Transaction hash'
  })
  mint(
    @Param('id') id: string,
    @Body() { certificateIds }: MintDto) {
    return this.batchService.mint(id, certificateIds);
  }
}
