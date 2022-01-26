import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  CertificateModule,
  entities as CertificateEntities,
} from '../certificate';
import {
  BlockchainPropertiesModule,
  entities as BlockchainPropertiesEntities,
} from '../blockchain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module';
import { Account } from '../account/account.entity';
import { HttpLoggerMiddleware } from '../middlewares/http-logger.middleware';
import { HttpsRedirectMiddleware } from '../middlewares/https-redirect.middleware';

const OriginAppTypeOrmModule = () => {
  const entities = [
    Account,
    ...CertificateEntities,
    ...BlockchainPropertiesEntities,
  ];

  return TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities,
    logging: ['info'],
    ssl: process.env.DB_SSL_OFF
      ? false
      : { rejectUnauthorized: false },
  });
};

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
        API_KEY: Joi.string().required(),
        PORT: Joi.number().default(3334),
        LOG_LEVELS: Joi.string().default('log,error,warn,debug,verbose'),
        WEB3: Joi.string().default('http://localhost:8545'),
        MNEMONIC: Joi.string().required(),
        ISSUER_CHAIN_ADDRESS: Joi.string().required(),
      }),
    }),
    CertificateModule,
    BlockchainPropertiesModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware, HttpsRedirectMiddleware).forRoutes('*');
  }
}
