import { UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { CertificateController as TokenCertificateController } from '@zero-labs/tokenization-api';
import { IssuerGuard } from '../auth/issuer.guard';

@ApiSecurity('api-key')
@UseGuards(IssuerGuard)
export class CertificateController extends TokenCertificateController {}