import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AgreementService, IStorageAdapter } from '@zero-labs/tokenization-api';
import { AccountModule } from '../account/account.module';
import { InventoryModule } from '../inventory/inventory.module';

import { AgreementController } from './agreement.controller';

@Module({})
export class AgreementModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: AgreementModule,
      imports: [
        CqrsModule,
        AccountModule.register(storageAdapter),
        InventoryModule.register(storageAdapter)
      ],
      controllers: [AgreementController],
      providers: [
        {
          provide: 'STORAGE_ADAPTER',
          useValue: storageAdapter,
        },
        AgreementService,
      ],
      exports: [AgreementService],
    };
  }
}
