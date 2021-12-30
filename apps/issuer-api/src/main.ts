/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { intersection } from 'lodash';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevelsFromEnv()
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.enableShutdownHooks(); // required by the docker engine

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('Energy Web Zero PL POC Issuer API')
    .setVersion('0.3')
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY' }, 'api-key')
    .build());

  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Swagger documentation for Energy Web Zero PL POC Issuer API',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();

function getLogLevelsFromEnv(): LogLevel[] {
  const allowedLogLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  const envLogLevels = (process.env.LOG_LEVELS).split(',') as LogLevel[];

  return intersection(allowedLogLevels, envLogLevels) as LogLevel[];
}
