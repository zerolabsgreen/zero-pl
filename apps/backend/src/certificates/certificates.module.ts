import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { IssuerModule } from '../issuer/issuer.module';

@Module({
  imports: [IssuerModule],
  controllers: [CertificatesController],
  providers: [CertificatesService],
  exports: [CertificatesService]
})
export class CertificatesModule {}
