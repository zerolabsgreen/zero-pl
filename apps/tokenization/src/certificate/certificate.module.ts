import { DynamicModule, Module } from '@nestjs/common';
import { CertificateService, IStorageAdapter } from '@zero-labs/tokenization-api';
import { BlockchainPropertiesModule } from '../blockchain/blockchain-properties.module';
import { CertificateController } from './certificate.controller';

@Module({})
export class CertificateModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: CertificateModule,
      imports: [BlockchainPropertiesModule.register(storageAdapter)],
      controllers: [CertificateController],
      providers: [
        {
          provide: 'STORAGE_ADAPTER',
          useValue: storageAdapter,
        },
        CertificateService,
      ],
      exports: [CertificateService],
    };
  }
}
