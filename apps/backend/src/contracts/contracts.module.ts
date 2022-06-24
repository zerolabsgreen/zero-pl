import { Module } from '@nestjs/common';
import * as process from 'process';

import { BuyersModule } from '../buyers/buyers.module';

import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { SellersModule } from '../sellers/sellers.module';
import { FilecoinNodesModule } from '../filecoin-nodes/filecoin-nodes.module';

@Module({
  imports: [
    BuyersModule,
    SellersModule,
    FilecoinNodesModule
  ],
  controllers: [ContractsController],
  providers: [ContractsService],
  exports: [ContractsService]
})
export class ContractsModule {}
