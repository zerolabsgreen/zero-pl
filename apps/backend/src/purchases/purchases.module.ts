import { CacheModule, Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { CertificatesModule } from '../certificates/certificates.module';
import { BuyersModule } from '../buyers/buyers.module';
import { IssuerModule } from '../issuer/issuer.module';
import * as redisStore from 'cache-manager-redis-store';
import * as process from 'process';

@Module({
  imports: [
    BuyersModule,
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
    IssuerModule
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService]
})
export class PurchasesModule {}
