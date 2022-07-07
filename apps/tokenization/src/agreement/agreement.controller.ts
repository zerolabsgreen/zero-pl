import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AgreementDTO, AgreementService, BlockchainPropertiesService, CreateAgreementDTO, TransactionHash } from '@zero-labs/tokenization-api';
import { providers, Wallet } from 'ethers';
import { signAgreement } from '@zero-labs/tokenization';
import { AccountService } from '../account/account.service';
import { IssuerGuard } from '../auth/issuer.guard';

@ApiTags('agreement')
@Controller('agreement')
@UsePipes(ValidationPipe)
@ApiSecurity('api-key')
@UseGuards(IssuerGuard)
export class AgreementController {
  private readonly logger = new Logger(AgreementController.name, {
    timestamp: true,
  });

  constructor(
    private readonly blockchainPropertiesService: BlockchainPropertiesService,
    private readonly agreementService: AgreementService,
    private readonly accountService: AccountService
  ) {}

  @Post()
  @ApiBody({ type: CreateAgreementDTO })
  @ApiCreatedResponse({
    type: AgreementDTO,
    description: 'Agreement data',
  })
  public async create(
    @Body() params: CreateAgreementDTO,
  ): Promise<AgreementDTO> {
    return await this.agreementService.create(params);
  }

  @Post()
  @ApiBody({ type: CreateAgreementDTO })
  @ApiCreatedResponse({
    type: AgreementDTO,
    description: 'Deployed agreement data',
  })
  public async deploy(
    @Body() params: CreateAgreementDTO,
  ): Promise<AgreementDTO> {
    return AgreementDTO.toDto(await this.agreementService.create(params));
  }

  @Post(':address/sign')
  @ApiCreatedResponse({
    type: String,
    description: 'Signing ceremony transaction hash',
  })
  public async sign(
    @Param('address') address: string,
  ): Promise<TransactionHash> {
    const agreement = await this.agreementService.get(address);

    const seller = await this.accountService.get(agreement.seller);
    const buyer = await this.accountService.get(agreement.buyer);

    const { rpcNode } = await this.blockchainPropertiesService.get();
    const provider = new providers.JsonRpcProvider(rpcNode);

    const buyerWallet = new Wallet(buyer.privateKey, provider);
    const sellerWallet = new Wallet(seller.privateKey, provider);

    return await this.agreementService.sign(
      agreement.address,
      await signAgreement(sellerWallet, agreement.address),
      await signAgreement(buyerWallet, agreement.address),
    );
  }

  @Get('/:address')
  @ApiOkResponse({
    type: AgreementDTO,
    description: 'Returns the agreement',
  })
  public async get(@Param('address') address: string): Promise<AgreementDTO> {
    return AgreementDTO.toDto(await this.agreementService.get(address));
  }

  @Get()
  @ApiOkResponse({
    type: [AgreementDTO],
    description: 'Returns all agreements',
  })
  public async getAll(): Promise<AgreementDTO[]> {
    return (await this.agreementService.getAll()).map((agreement) =>
      AgreementDTO.toDto(agreement),
    );
  }
}
