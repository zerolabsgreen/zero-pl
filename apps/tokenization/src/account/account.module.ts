import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BlockchainPropertiesService, IStorageAdapter } from '@zero-labs/tokenization-api';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { SignerService } from './get-signer.service';

@Module({})
export class AccountModule {
  static register(storageAdapter: IStorageAdapter): DynamicModule {
    return {
      module: AccountModule,
      imports: [TypeOrmModule.forFeature([Account]), ConfigModule],
      controllers: [AccountController],
      providers: [
        {
          provide: 'STORAGE_ADAPTER',
          useValue: storageAdapter,
        },
        AccountService,
        SignerService,
        BlockchainPropertiesService
      ],
      exports: [AccountService, SignerService]
    }
  }
}
