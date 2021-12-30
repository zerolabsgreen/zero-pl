import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerDocumentationConfig() {
  return new DocumentBuilder()
    .setTitle('Energy Web Zero PL POC API')
    .setVersion('0.3')
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY' }, 'api-key')
    .build();
}
