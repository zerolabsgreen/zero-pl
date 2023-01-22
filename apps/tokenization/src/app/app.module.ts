import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  Inventory,
  Certificate,
  Batch,
  Generator,
  TransferSingle,
  ClaimSingle,
  Agreement,
  AgreementFilled,
  TransferBatchMultipleTx,
  TransferBatchMultiple,
  redisUrlToConfig,
  getDBConnectionOptions,
  IStorageAdapter
} from '@zero-labs/tokenization-api';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { AccountModule } from '../account/account.module';
import { Account } from '../account/account.entity';
import { HttpLoggerMiddleware } from '../middlewares/http-logger.middleware';
import { AgreementModule } from '../agreement';
import { WatcherModule } from '../watcher/watcher.module';
import { BatchModule } from '../batch/batch.module';
import { InventoryModule } from '../inventory/inventory.module';
import { CertificateModule } from '../certificate/certificate.module';

const entities = [
  Inventory,
  Account,
  Batch,
  Certificate,
  Generator,
  TransferSingle,
  TransferBatchMultiple,
  TransferBatchMultipleTx,
  ClaimSingle,
  Agreement,
  AgreementFilled
];

@Module({})
export class TokenizationModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: TokenizationModule,
      imports: [
        TypeOrmModule.forRoot({
            ...getDBConnectionOptions(
                process.env.TOKENIZATION_DATABASE_URL,
                Boolean(process.env.DB_SSL_OFF)
            ),
            logging: ['info'],
            entities: entities,
        }),
        ConfigModule.forRoot({
          envFilePath: ['.env'],
          isGlobal: true,
          validationOptions: {
            allowUnknown: true,
            abortEarly: false,
          },
          validationSchema: Joi.object({
            NODE_ENV: Joi.string()
              .valid('development', 'production', 'test')
              .default('development'),
            SUPERADMIN_API_KEY: Joi.string().required(),
            PORT: Joi.number().default(3334),
            LOG_LEVELS: Joi.string().default('log,error,warn,debug,verbose'),
            WEB3: Joi.string().default('http://localhost:8545'),
            USER_MNEMONIC: Joi.string().required(),
          }),
        }),
        CertificateModule.register(storageAdapter),
        AccountModule.register(storageAdapter),
        BullModule.forRoot({
          redis: redisUrlToConfig(process.env.REDIS_URL),
        }),
        InventoryModule.register(storageAdapter),
        BatchModule.register(storageAdapter),
        WatcherModule.register(storageAdapter),
        AgreementModule.register(storageAdapter),
      ],
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware) //, HttpsRedirectMiddleware) - Disabling for now, doesn't work as expected
    .forRoutes('*');
  }
}
