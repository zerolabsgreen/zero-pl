import { UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { BlockchainPropertiesController as TokenBlockchainPropertiesController } from '@zero-labs/tokenization-api';
import { IssuerGuard } from '../auth/issuer.guard';

@ApiSecurity('api-key')
@UseGuards(IssuerGuard)
export class BlockchainPropertiesController extends TokenBlockchainPropertiesController {}