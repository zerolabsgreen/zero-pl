import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { InventoryService, IStorageAdapter } from '@zero-labs/tokenization-api';
import { CqrsModule } from '@nestjs/cqrs';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { SignerService } from './get-signer.service';

@Module({})
export class AccountModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: AccountModule,
      imports: [CqrsModule, TypeOrmModule.forFeature([Account]), ConfigModule],
      controllers: [AccountController],
      providers: [
        {
          provide: 'STORAGE_ADAPTER',
          useValue: storageAdapter,
        },
        AccountService,
        SignerService,
        InventoryService
      ],
      exports: [AccountService, SignerService]
    }
  }
}
