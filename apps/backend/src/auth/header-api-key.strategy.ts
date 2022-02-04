import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import Strategy from 'passport-headerapikey';
import { ApiKeysService } from '../apikeys/apikeys.service';

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

    const exists = await this.apiKeysService.findOne(apiKey);

    if (exists) {
      done(null, true);
    }

    done(new UnauthorizedException(), null);
  }
}
