import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { InventoryService, IStorageAdapter } from '@zero-labs/tokenization-api';
import { InventoryController } from './inventory.controller';

@Module({})
export class InventoryModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: InventoryModule,
      controllers: [InventoryController],
      imports: [CqrsModule, ScheduleModule.forRoot()],
      providers: [
        {
          provide: 'STORAGE_ADAPTER',
          useValue: storageAdapter,
        },
        InventoryService,
      ],
      exports: [InventoryService],
    };
  }
}
