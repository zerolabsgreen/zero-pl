import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CertificateService, IStorageAdapter } from '@zero-labs/tokenization-api';
import { InventoryModule } from '../inventory/inventory.module';
import { CertificateController } from './certificate.controller';

@Module({})
export class CertificateModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: CertificateModule,
      imports: [CqrsModule, InventoryModule.register(storageAdapter)],
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
