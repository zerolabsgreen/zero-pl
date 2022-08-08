import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  BlockchainProperties,
  Certificate,
  Batch,
  Generator,
  TransferSingle,
  ClaimSingle,
  PostgresTypeORMAdapter,
  Agreement,
  AgreementFilled,
  TransferBatchMultipleTx,
  TransferBatchMultiple
} from '@zero-labs/tokenization-api';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { AccountModule } from '../account/account.module';
import { Account } from '../account/account.entity';
import { HttpLoggerMiddleware } from '../middlewares/http-logger.middleware';
import { AgreementModule } from '../agreement';
import { WatcherModule } from '../watcher/watcher.module';
import { BatchModule } from '../batch/batch.module';
import { BlockchainPropertiesModule } from '../blockchain/blockchain-properties.module';
import { CertificateModule } from '../certificate/certificate.module';

const OriginAppTypeOrmModule = () => {
  if (!process.env.TOKENIZATION_DATABASE_URL) {
    throw new Error('TOKENIZATION_DATABASE_URL undefined');
  } 

  const entities = [
    Account,
    BlockchainProperties,
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

  return TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.TOKENIZATION_DATABASE_URL,
    entities,
    logging: ['info'],
    ssl: process.env.DB_SSL_OFF
      ? false
      : { rejectUnauthorized: false },
  });
};

const storageAdapter = new PostgresTypeORMAdapter();

@Module({
  imports: [
    OriginAppTypeOrmModule(),
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
    AccountModule.register(storageAdapter),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT || 6379),
        username: process.env.REDIS_USERNAME || '',
        password: process.env.REDIS_PASSWORD || '',
        tls: Boolean(process.env.REDIS_TLS_OFF)
          ? undefined
          : { rejectUnauthorized: false },
      },
    }),
    BlockchainPropertiesModule.register(storageAdapter),
    BatchModule.register(storageAdapter),
    CertificateModule.register(storageAdapter),
    WatcherModule.register(storageAdapter),
    AgreementModule.register(storageAdapter),
  ],
})
export class TokenizationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware) //, HttpsRedirectMiddleware) - Disabling for now, doesn't work as expected
    .forRoutes('*');
  }
}
