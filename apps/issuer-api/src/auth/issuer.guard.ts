import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IssuerGuard implements CanActivate {
  public constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    return request.headers['x-api-key'] === this.configService.get<string>('API_KEY');
  }
}
