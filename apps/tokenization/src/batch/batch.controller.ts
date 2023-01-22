import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BatchDTO, BatchService, IBatch, InventoryService, MintCertificateDTO, SetRedemptionStatementDTO, TransactionPendingDTO } from '@zero-labs/tokenization-api';
import { IssuerGuard } from '../auth/issuer.guard';
import { InventoryIdController } from '../inventory/InventoryIdController';

@ApiTags('batch')
@Controller('batch')
@UsePipes(ValidationPipe)
@ApiSecurity('api-key')
@UseGuards(IssuerGuard)
export class BatchController extends InventoryIdController {
    constructor(
      public readonly batchService: BatchService,
      inventory: InventoryService,
    ) {
      super(inventory);
    }

    @Get('/id/generate')
    @ApiOkResponse({
      type: String,
      description: 'Generates a random batch ID',
    })
    public async create(): Promise<string> {
      return this.batchService.generateRandomBatchId();
    }
  
    @Get('/id/:txHash')
    @ApiOkResponse({
      type: [String],
      description: 'Returns batch IDs that were created in the transaction',
    })
    public async getBatchesCreatedIn(
      @Param('txHash') txHash: string,
    ): Promise<IBatch['id'][]> {
      return this.batchService.getBatchesCreatedIn(this.getInventoryId(), txHash);
    }
  
    @Get('/:id')
    @ApiOkResponse({
      type: BatchDTO,
      description: 'Returns the batch',
    })
    public async get(@Param('id') id: string): Promise<BatchDTO> {
      return this.batchService.get(this.getInventoryId(), id);
    }
  
    @Get()
    @ApiOkResponse({
      type: [BatchDTO],
      description: 'Returns all batches',
    })
    public async getAll(): Promise<BatchDTO[]> {
      return this.batchService.getAll(this.getInventoryId());
    }
  
    @Post('/redemption-statement/:batchId')
    @ApiBody({ type: SetRedemptionStatementDTO })
    @ApiCreatedResponse({
      type: TransactionPendingDTO,
      description:
        'Sets a redemption statement to a batch and returns the tx hash',
    })
    public async setRedemptionStatement(
      @Param('batchId') batchId: string,
      @Body() { value, storagePointer }: SetRedemptionStatementDTO,
    ): Promise<TransactionPendingDTO> {
      return this.batchService.setRedemptionStatement(
        this.getInventoryId(),
        batchId,
        value,
        storagePointer,
      );
    }
  
    @Post('/mint/:batchId')
    @ApiBody({ type: [MintCertificateDTO] })
    @ApiCreatedResponse({
      type: TransactionPendingDTO,
      description: 'Mints certificates from a batch and returns the tx hash',
    })
    public async mint(
      @Param('batchId') batchId: string,
      @Body() dtos: MintCertificateDTO[],
    ): Promise<TransactionPendingDTO> {
      return this.batchService.mint(this.getInventoryId(), batchId, dtos);
    }
}
