import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
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
    FilecoinNodesModule,
    CacheModule.registerAsync({
      useFactory: () => {
        if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
          return {
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
          }
        }
      }
    })
  ],
  controllers: [ContractsController],
  providers: [ContractsService],
  exports: [ContractsService]
})
export class ContractsModule {}
