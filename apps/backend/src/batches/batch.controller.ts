import {
  Body,
  ClassSerializerInterceptor,
  Controller,
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
import { BatchService } from './batch.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { BatchDto } from "./dto/batch.dto";
import { AuthGuard } from "@nestjs/passport";
import { NoDataInterceptor } from "../interceptors/NoDataInterceptor";
import { ApiKeyPermissionsGuard } from '../guards/apikey-permissions.guard';
import { ApiKeyPermissions } from '@prisma/client';
import { SetRedemptionStatementDto } from './dto/set-redemption-statement.dto';
import { MintDto } from './dto/mint.dto';
import { PaginatedDto } from '../utils/paginated.dto';
import { CreateBatchDto } from './dto/create-batch.dto';
import { TxHash } from '../utils/types';
import { CertificateIdsDTO } from './dto/certificate-ids.dto';

@Controller('/partners/filecoin/batch')
@ApiTags('Filecoin Batches')
@UseGuards(AuthGuard('api-key'))
@ApiSecurity('api-key', ['api-key'])
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiCreatedResponse({
      type: [CreateBatchDto],
      description: 'Creates the off-chain batch entry'
  })
  create(@Param('id') id: string) {
    return this.batchService.create(Number(id));
  }

  @Get()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: [PaginatedDto] })
  @ApiQuery({ name: 'skip', type: String, required: false })
  @ApiQuery({ name: 'take', type: String, required: false })
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string
  ): Promise<PaginatedDto<BatchDto>> {
    return this.batchService.findAll({ skip: Number(skip), take: Number(take) });
  }

  @Get(':id')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.PUBLIC, ApiKeyPermissions.READ]))
  @ApiOkResponse({ type: BatchDto })
  findOne(@Param('id') id: string) {
    return this.batchService.findOne(id);
  }

  @Post(':id/redemption-statement')
  @ApiBody({ type: SetRedemptionStatementDto })
  @ApiCreatedResponse({
    type: String,
    description: 'Transaction hash'
  })
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  setRedemptionStatement(
    @Param('id') id: string,
    @Body() { redemptionStatementId, totalVolume }: SetRedemptionStatementDto
  ): Promise<string> {
    return this.batchService.setRedemptionStatement(id, redemptionStatementId, totalVolume);
  }

  @Post(':id/mint')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiBody({ type: MintDto })
  @ApiCreatedResponse({
      type: String,
      description: 'Minting transaction hash'
  })
  mint(
    @Param('id') id: string,
    @Body() { certificateIds }: MintDto
  ): Promise<TxHash>
  {
    return this.batchService.mint(id, certificateIds ?? []);
  }

  @Patch('attach/:txHash')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  @ApiParam({ name: 'txHash', type: String })
  @ApiCreatedResponse({
    type: [CertificateIdsDTO],
    description: 'Attached certificates'
  })
  async attachCertificates(
    @Param('txHash') txHash: TxHash,
  ): Promise<CertificateIdsDTO[]> {
    return this.batchService.attachCerts(txHash);
  }
}
