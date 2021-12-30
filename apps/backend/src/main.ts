/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { PrismaService } from "./prisma/prisma.service";
import { intersection } from 'lodash';
import { SwaggerModule } from "@nestjs/swagger";
import { getSwaggerDocumentationConfig } from "./swagger/SwaggerDocumentConfig";
import { PrismaClientExceptionFilter } from "./exception-filters/PrismaClientExceptionFilter";
import { NoDataInterceptor } from "./interceptors/NoDataInterceptor";

const logger = new Logger('bootstrap', { timestamp: true });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevelsFromEnv()
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalFilters(new PrismaClientExceptionFilter(app.getHttpAdapter()));

  const document = SwaggerModule.createDocument(app, getSwaggerDocumentationConfig());
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Swagger documentation for Energy Web Zero PL POC API',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    maxAge: parseInt(process.env.CORS_MAX_AGE)
  });

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });

  const prisma = app.get<PrismaService>(PrismaService);

  prisma.$on('beforeExit', async function () {
    logger.log('Prisma client "beforeExit" event, initiating shut down routine');

    // hacky way of enabling shutdown hooks because prisma handles stop signals itself
    logger.debug('awaiting application closed');
    await app.close();
    logger.debug('application closed');
  });
}

bootstrap();

function getLogLevelsFromEnv(): LogLevel[] {
  const allowedLogLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  const envLogLevels = (process.env.LOG_LEVELS).split(',') as LogLevel[];

  return intersection(allowedLogLevels, envLogLevels) as LogLevel[]
}
