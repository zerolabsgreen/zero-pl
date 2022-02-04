import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { Request } from 'express';
import { ApiKeyPermissions } from '@prisma/client';
import { ApiKeysService } from '../apikeys/apikeys.service';
import { Type } from '@nestjs/passport';
import { memoize } from '../utils/memoize';

export const ApiKeyPermissionsGuard: (
  neededPermissions: ApiKeyPermissions[]
) => Type<CanActivate> = memoize(createApiKeyPermissionsGuard);

function createApiKeyPermissionsGuard(neededPermissions: ApiKeyPermissions[]): Type<CanActivate> {
  @Injectable()
  class MixinApiKeyPermissionsGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly apiKeysService: ApiKeysService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();
      const apiKey = request.headers['x-api-key'] as string;
      
      const adminKey = this.configService.get<string>('SUPERADMIN_API_KEY');

      if (adminKey === apiKey) {
        return true;
      }

      const apiKeyEntity = await this.apiKeysService.findOne(apiKey);

      if (apiKeyEntity) {
          return neededPermissions.every(
              perm => apiKeyEntity.permissions.includes(perm)
          );
      }

      return false;
    }
  };
  
  const guard = mixin(MixinApiKeyPermissionsGuard);
  return guard;
}
