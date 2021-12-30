import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { IssuerGuard } from '../auth/issuer.guard';
import { AccountDTO } from './account.dto';
import { AccountService } from './account.service';

@ApiSecurity('api-key')
@ApiTags('account')
@Controller('account')
@UseGuards(IssuerGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccountDTO,
    description: 'Creates a new blockchain account'
  })
  public async create(): Promise<AccountDTO> {
    return this.accountService.create();
  }
}
