import { Global, Module } from '@nestjs/common';

import { ApiKeysService } from './apikeys.service';

@Global()
@Module({
  providers: [ApiKeysService],
  exports: [ApiKeysService]
})
export class ApiKeysModule {}
