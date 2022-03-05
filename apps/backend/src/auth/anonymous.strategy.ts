import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import Strategy from './strategy/anonymous.strategy.impl';
import { ApiKeysService } from '../apikeys/apikeys.service';
import { ApiKey } from '@prisma/client';

@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy, 'anonymous') {
  constructor() {
    super();
  }

  authenticate() {
    return this.success({})
  }

}
