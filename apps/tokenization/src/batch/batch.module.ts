import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BatchService, IStorageAdapter } from '@zero-labs/tokenization-api';
import { InventoryModule } from '../inventory/inventory.module';
import { BatchController } from './batch.controller';

@Module({})
export class BatchModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: BatchModule,
      imports: [CqrsModule, InventoryModule.register(storageAdapter)],
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
