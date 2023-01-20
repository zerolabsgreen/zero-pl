import { DynamicModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { IStorageAdapter, OnChainEventProcessor, OnChainEventWatcher } from '@zero-labs/tokenization-api';

import { AgreementModule } from '../agreement';
import { InventoryModule } from '../inventory/inventory.module';
import { CertificateModule } from '../certificate/certificate.module';
import { BatchModule } from '../batch/batch.module';

@Module({})
export class WatcherModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: WatcherModule,
      imports: [
        CqrsModule,
        ScheduleModule.forRoot(),
        InventoryModule.register(storageAdapter),
        CertificateModule.register(storageAdapter),
        BatchModule.register(storageAdapter),
        AgreementModule.register(storageAdapter),
        BullModule.registerQueue({
          name: 'on-chain-event',
        }),
      ],
      providers: [OnChainEventWatcher, OnChainEventProcessor],
      exports: [OnChainEventWatcher],
    };
  }
}
