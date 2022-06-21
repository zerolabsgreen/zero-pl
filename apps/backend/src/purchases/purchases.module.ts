import { CacheModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import * as redisStore from 'cache-manager-redis-store';
import * as process from 'process';
import { PDFModule } from '@t00nday/nestjs-pdf';

import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { CertificatesModule } from '../certificates/certificates.module';
import { BuyersModule } from '../buyers/buyers.module';
import { IssuerModule } from '../issuer/issuer.module';
import { FilesModule } from '../files/files.module';
import { SellersModule } from '../sellers/sellers.module';
import { BatchModule } from '../batches/batch.module';
import { ContractsModule } from '../contracts/contracts.module';
import { PurchaseProcessor } from './purchase.processor';

@Module({
  imports: [
    PDFModule.register({
      view: {
          root: `${__dirname}/templates`,
          engine: 'htmling'
      },
    }),
    BullModule.registerQueue({
      name: 'purchase',
    }),
    FilesModule,
    BuyersModule,
    SellersModule,
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
    }),
    CertificatesModule,
    IssuerModule,
    BatchModule,
    ContractsModule,
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService, PurchaseProcessor]
})
export class PurchasesModule {}
