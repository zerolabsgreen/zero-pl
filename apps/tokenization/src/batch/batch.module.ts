import { DynamicModule, Module } from '@nestjs/common';
import { BatchService, IStorageAdapter } from '@zero-labs/tokenization-api';
import { BlockchainPropertiesModule } from '../blockchain/blockchain-properties.module';
import { BatchController } from './batch.controller';

@Module({})
export class BatchModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: BatchModule,
      imports: [BlockchainPropertiesModule.register(storageAdapter)],
      controllers: [BatchController],
      providers: [
        {
          provide: 'STORAGE_ADAPTER',
          useValue: storageAdapter,
        },
        BatchService,
      ],
      exports: [BatchService],
    };
  }
}
