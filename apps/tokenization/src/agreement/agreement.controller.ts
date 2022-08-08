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
import { AgreementDTO, AgreementService, BlockchainPropertiesService, CreateAgreementDTO, SignAgreementDTO, TransactionHash } from '@zero-labs/tokenization-api';
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
  @ApiBody({ type: [CreateAgreementDTO] })
  @ApiCreatedResponse({
    type: [AgreementDTO],
    description: 'Agreement data',
  })
  public async create(
    @Body() dtos: CreateAgreementDTO[],
  ): Promise<AgreementDTO[]> {
    const agreements = await this.agreementService.create(dtos);
    
    return await Promise.all(
      agreements.map(async (agreement) => {
        return await AgreementDTO.toDto(
          agreement,
          await this.agreementService.getFilledEvents(agreement.address),
        );
      }),
    );
  }

  @Post('/sign')
  @ApiBody({ type: [String] })
  @ApiCreatedResponse({
    type: String,
    description: 'Signing ceremony transaction hash',
  })
  public async sign(
    @Body() addresses: string[],
  ): Promise<TransactionHash> {
    const agreements = await this.agreementService.getMultiple(addresses);

    const { rpcNode } = await this.blockchainPropertiesService.get();
    const provider = new providers.JsonRpcProvider(rpcNode);

    const signatures: SignAgreementDTO[] = [];

    for (const agreement of agreements) {
      const seller = await this.accountService.get(agreement.seller);
      const buyer = await this.accountService.get(agreement.buyer);
  
      const buyerWallet = new Wallet(buyer.privateKey, provider);
      const sellerWallet = new Wallet(seller.privateKey, provider);

      signatures.push({
        agreementAddress: agreement.address,
        sellerSignature: await signAgreement(sellerWallet, agreement.address),
        buyerSignature: await signAgreement(buyerWallet, agreement.address),
      })
    }


    return await this.agreementService.sign(signatures);
  }

  @Get('/:address')
  @ApiOkResponse({
    type: AgreementDTO,
    description: 'Returns the agreement',
  })
  public async get(@Param('address') address: string): Promise<AgreementDTO> {
    const agreement = await this.agreementService.get(address);
    const filledEvents = await this.agreementService.getFilledEvents(address);

    return AgreementDTO.toDto(agreement, filledEvents);
  }

  @Get()
  @ApiOkResponse({
    type: [AgreementDTO],
    description: 'Returns all agreements',
  })
  public async getAll(): Promise<AgreementDTO[]> {
    const allAgreements = await this.agreementService.getAll();

    return await Promise.all(
      allAgreements.map(async (agreement) => {
        return await AgreementDTO.toDto(
          agreement,
          await this.agreementService.getFilledEvents(agreement.address),
        );
      }),
    );
  }
}
