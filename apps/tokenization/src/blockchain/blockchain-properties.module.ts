import { DynamicModule, Module } from '@nestjs/common'
import { BlockchainPropertiesService, IStorageAdapter } from '@zero-labs/tokenization-api';
import { BlockchainPropertiesController } from './blockchain-properties.controller';

@Module({})
export class BlockchainPropertiesModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: BlockchainPropertiesModule,
      controllers: [BlockchainPropertiesController],
      providers: [
        {
          provide: 'STORAGE_ADAPTER',
          useValue: storageAdapter,
        },
        BlockchainPropertiesService,
      ],
      exports: [BlockchainPropertiesService],
    };
  }
}
