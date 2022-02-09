import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import Strategy from 'passport-headerapikey';
import { ApiKeysService } from '../apikeys/apikeys.service';
import { ApiKey } from '@prisma/client';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(
    private readonly configService: ConfigService,
    private readonly apiKeysService: ApiKeysService,
  ) {
    super(
      { header: 'X-API-KEY', prefix: '' },
      true,
      async (apiKey, done) => {
        return this.validate(apiKey, done);
      });
  }

  public validate = async (apiKey: string, done: (error: Error, data) => Record<string, unknown>) => {
    const adminKey = this.configService.get<string>('SUPERADMIN_API_KEY');

    if (adminKey === apiKey) {
      done(null, true);
    }

    const existingApiKey: ApiKey | undefined = await this.apiKeysService.findOne(apiKey);

    if (existingApiKey) {
      const now = new Date();

      if (now.getMilliseconds() < existingApiKey.expires.getMilliseconds()) {
        done(null, true);
        return;
      }
    }

    done(new UnauthorizedException(), null);
  }
}
