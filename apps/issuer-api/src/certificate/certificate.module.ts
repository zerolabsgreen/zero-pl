import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { Certificate, CertificateHandlers, OnChainCertificateWatcher, UnminedCommitment } from '@energyweb/issuer-api';

import { CertificateController } from './certificate.controller';
import { BlockchainPropertiesModule } from "../blockchain";

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    TypeOrmModule.forFeature([Certificate, UnminedCommitment]),
    BlockchainPropertiesModule
  ],
  controllers: [CertificateController],
  providers: [...CertificateHandlers, OnChainCertificateWatcher],
  exports: [...CertificateHandlers, OnChainCertificateWatcher]
})
export class CertificateModule {}
