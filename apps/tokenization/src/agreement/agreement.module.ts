import { DynamicModule, Module } from '@nestjs/common';
import { AgreementService, BlockchainPropertiesModule, IStorageAdapter } from '@zero-labs/tokenization-api';

import { AgreementController } from './agreement.controller';

@Module({})
export class AgreementModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: AgreementModule,
      imports: [BlockchainPropertiesModule.register(storageAdapter)],
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
