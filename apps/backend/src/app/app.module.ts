import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { FilesModule } from "../files/files.module";
import { PurchasesModule } from "../purchases/purchases.module";
import { BuyersModule } from "../buyers/buyers.module";
import { SellersModule } from "../sellers/sellers.module";
import { CertificatesModule } from "../certificates/certificates.module";
import { FilecoinNodesModule } from "../filecoin-nodes/filecoin-nodes.module";
import { OrdersModule } from "../orders/orders.module";
import { HttpLoggerMiddleware } from '../middlewares/http-logger.middleware';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false
      },
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),

        PORT: Joi.number().default(3333),
        LOG_LEVELS: Joi.string().default('log,error,warn,debug,verbose'),
        CORS_ORIGIN: Joi.string().default('*'),
        CORS_MAX_AGE: Joi.number().default(900),
        UPLOADED_FILE_SIZE_LIMIT: Joi.number().default(200000),
        UI_BASE_URL: Joi.string().uri().default('http://localhost:3000'),
        API_BASE_URL: Joi.string().uri().default('http://localhost:3333'),
        FILES_BASE_URL: Joi.string().uri().default('http://localhost:3333/api/files'),
        ISSUER_API_BASE_URL: Joi.string().default('http://localhost:3334'),
        ISSUER_CHAIN_ADDRESS: Joi.string().required(),
        PG_TRANSACTION_TIMEOUT: Joi.number().default(120000),
        CHAIN_EVENTS_TTL: Joi.number().default(300),
        SMTP_URL: Joi.string()
          .uri({ allowRelative: false, scheme: 'smtp' })
          .default('smtp://localhost:1025'),
        SMTP_FROM: Joi.string().default('"EW Zero" <notification@energyweb.org>'),
      })
    }),
    PrismaModule,
    AuthModule,
    FilesModule,
    PurchasesModule,
    BuyersModule,
    SellersModule,
    CertificatesModule,
    FilecoinNodesModule,
    OrdersModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes('*');
  }
}
