import { Body, Controller, Get, OnModuleInit, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BatchDTO, BatchService, IBatch, InventoryService, MintCertificateDTO, SetRedemptionStatementDTO, TransactionPendingDTO } from '@zero-labs/tokenization-api';
import { IssuerGuard } from '../auth/issuer.guard';

@ApiTags('batch')
@Controller('batch')
@UsePipes(ValidationPipe)
@ApiSecurity('api-key')
@UseGuards(IssuerGuard)
export class BatchController implements OnModuleInit {
    private inventoryId: string;

    constructor(
        private readonly inventory: InventoryService,
        public readonly batchService: BatchService,
    ) {}

    async onModuleInit() {
        const [{ netId, topic }] = await this.inventory.getAll();
        this.inventoryId = netId + '_' + topic;
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
      return this.batchService.getBatchesCreatedIn(this.inventoryId, txHash);
    }
  
    @Get('/:id')
    @ApiOkResponse({
      type: BatchDTO,
      description: 'Returns the batch',
    })
    public async get(@Param('id') id: string): Promise<BatchDTO> {
      return this.batchService.get(this.inventoryId, id);
    }
  
    @Get()
    @ApiOkResponse({
      type: [BatchDTO],
      description: 'Returns all batches',
    })
    public async getAll(): Promise<BatchDTO[]> {
      return this.batchService.getAll(this.inventoryId);
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
        this.inventoryId,
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
      return this.batchService.mint(this.inventoryId, batchId, dtos);
    }
}
