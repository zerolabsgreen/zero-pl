import { Module } from '@nestjs/common';
import { IssuerService } from './issuer.service';

@Module({
  providers: [IssuerService],
  exports: [IssuerService]
})
export class IssuerModule {}
