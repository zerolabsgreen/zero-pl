import { DocumentBuilder } from '@nestjs/swagger';
import * as packageJson from './../../../../package.json'

export function getSwaggerDocumentationConfig() {
  return new DocumentBuilder()
    .setTitle('Zero Labs API - Protocol Labs')
    .setVersion(packageJson.version)
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY' }, 'api-key')
    .build();
}
