import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './header-api-key.strategy';
import { ConfigModule } from '@nestjs/config';
import { AnonymousStrategy } from './anonymous.strategy';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [HeaderApiKeyStrategy, AnonymousStrategy],
})

export class AuthModule {}
