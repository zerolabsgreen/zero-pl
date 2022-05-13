import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';
import { IssuerModule } from '../issuer/issuer.module';
import { CertificatesModule } from '../certificates/certificates.module';
import { SellersModule } from '../sellers/sellers.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [IssuerModule, CertificatesModule, SellersModule, FilesModule],
  controllers: [BatchController],
  providers: [BatchService],
  exports: [BatchService]
})
export class BatchModule {}
