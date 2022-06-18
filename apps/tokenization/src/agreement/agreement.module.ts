import { DynamicModule, Module } from '@nestjs/common';
import { AgreementService, IStorageAdapter } from '@zero-labs/tokenization-api';
import { AccountModule } from '../account/account.module';
import { BlockchainPropertiesModule } from '../blockchain/blockchain-properties.module';

import { AgreementController } from './agreement.controller';

@Module({})
export class AgreementModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: AgreementModule,
      imports: [
        AccountModule.register(storageAdapter),
        BlockchainPropertiesModule.register(storageAdapter)
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
