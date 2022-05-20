import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
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

@Controller('/partners/filecoin/batch')
@ApiTags('Filecoin Batches')
@UseGuards(AuthGuard('api-key'))
@ApiSecurity('api-key', ['api-key'])
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post()
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiCreatedResponse({
      type: [BatchDto],
      description: 'Creates a batch and returns an ID'
  })
  create() {
    return this.batchService.create();
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

  @Post(':id/redemption-statement')
  @ApiBody({ type: SetRedemptionStatementDto })
  @ApiCreatedResponse({
    type: String,
    description: 'Transaction hash'
  })
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.UPDATE]))
  setRedemptionStatement(
    @Param('id') id: string,
    @Body() { redemptionStatementId }: SetRedemptionStatementDto
  ): Promise<string> {
    return this.batchService.setRedemptionStatement(id, redemptionStatementId);
  }

  @Post(':id/mint')
  @UseGuards(ApiKeyPermissionsGuard([ApiKeyPermissions.CREATE]))
  @ApiBody({ type: MintDto })
  @ApiCreatedResponse({
      type: [Number],
      description: 'Certificate on-chain IDs'
  })
  mint(
    @Param('id') id: string,
    @Body() { certificateIds }: MintDto
  ): Promise<number[]>
  {
    return this.batchService.mint(id, certificateIds ?? []);
  }
}
