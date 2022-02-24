import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerDocumentationConfig() {
  return new DocumentBuilder()
    .setTitle('Zero Labs API - Protocol Labs')
    .setVersion('0.3')
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY' }, 'api-key')
    .build();
}
