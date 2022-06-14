import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  BlockchainProperties,
  Certificate,
  TokenAPIModule,
  Batch,
  Generator,
  TransferSingle,
  ClaimSingle,
  PostgresTypeORMAdapter
} from '@zero-labs/tokenization-api';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module';
import { Account } from '../account/account.entity';
import { HttpLoggerMiddleware } from '../middlewares/http-logger.middleware';

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
    ClaimSingle,
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
    TokenAPIModule.register(storageAdapter),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class TokenizationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware) //, HttpsRedirectMiddleware) - Disabling for now, doesn't work as expected
    .forRoutes('*');
  }
}
