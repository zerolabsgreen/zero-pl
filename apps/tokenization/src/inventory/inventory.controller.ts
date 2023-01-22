import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { InventoryDTO, InventoryService, TxReceiptDTO } from '@zero-labs/tokenization-api';
import { IssuerGuard } from '../auth/issuer.guard';
import { InventoryIdController } from './InventoryIdController';

@ApiTags('inventory')
@Controller('inventory')
@ApiSecurity('api-key')
@UseGuards(IssuerGuard)
export class InventoryController extends InventoryIdController {
  constructor(inventory: InventoryService) {
    super(inventory);
  }

  @Get()
  @ApiOkResponse({
    type: InventoryDTO,
    description: 'Returns the inventory',
  })
  public async get(): Promise<InventoryDTO> {
    return this.inventory.dto(this.getInventoryId());
  }

  @Get('/:txHash')
  @ApiOkResponse({
    type: String,
    description: 'Returns the receipt for the transaction',
  })
  public async getTransaction(@Param('txHash') txHash: string): Promise<TxReceiptDTO> {
    return this.inventory.getTransaction(this.getInventoryId(), txHash);
  }
}
