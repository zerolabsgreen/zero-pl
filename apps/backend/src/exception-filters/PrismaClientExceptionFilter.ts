import { ArgumentsHost, BadRequestException, Catch, ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name, { timestamp: true });

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    this.logger.debug(`Prisma exception caught: "${exception.code}"`);
    this.logger.debug(exception.message);
    this.logger.debug(JSON.stringify(exception));

    switch (exception.code) {
      // see error codes: https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
      case 'P2002':
        super.catch(new ConflictException(), host);
        break
      case 'P2003':
        super.catch(new BadRequestException(exception.message), host)
        break
      case 'P2025':
        super.catch(new NotFoundException(), host);
        break
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
