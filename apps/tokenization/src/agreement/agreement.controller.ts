import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AgreementDTO, AgreementService, InventoryService, CreateAgreementDTO, TransactionHash, InvalidateAgreementDTO, UpdateAgreementAmountDTO, UpdateAgreementMetadataDTO, SignAgreementDTO } from '@zero-labs/tokenization-api';
import { providers, Wallet } from 'ethers';
import { signAgreement } from '@zero-labs/tokenization';
import { AccountService } from '../account/account.service';
import { IssuerGuard } from '../auth/issuer.guard';
import { InventoryIdController } from '../inventory/InventoryIdController';

@ApiTags('agreement')
@Controller('agreement')
@UsePipes(ValidationPipe)
@ApiSecurity('api-key')
@UseGuards(IssuerGuard)
export class AgreementController extends InventoryIdController {
  constructor(
    private readonly agreementService: AgreementService,
    private readonly accountService: AccountService,
    inventory: InventoryService
  ) {
    super(inventory);
  }

  @Post()
  @ApiBody({ type: [CreateAgreementDTO] })
  @ApiCreatedResponse({
    type: [AgreementDTO],
    description: 'Agreement data',
  })
  public async create(
    @Body() dtos: CreateAgreementDTO[],
  ): Promise<AgreementDTO[]> {
    const agreements = await this.agreementService.create(this.getInventoryId(), dtos);
    
    return await Promise.all(
      agreements.map(async (agreement) => {
        return await AgreementDTO.toDto(
          agreement,
          await this.agreementService.getFilledEvents(this.getInventoryId(), agreement.address),
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
    const agreements = await this.agreementService.getMultiple(this.getInventoryId(), addresses);

    const { rpcNode } = await this.inventory.get(this.getInventoryId());
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

    return await this.agreementService.sign(this.getInventoryId(), signatures);
  }

  @Get('deployed/:salt')
  @ApiParam({ name: 'salt', type: String })
  @ApiOkResponse({
    type: String,
    description:
      'Check whether an agreement with a specific salt was already deployed. If deployed, will return the agreement address',
  })
  @ApiNotFoundResponse({
    description: `The agreement with that salt has not been deployed yet`,
  })
  public async isDeployed(@Param('salt') salt: string): Promise<string> {
    return await this.agreementService.getDeployedContractBySalt(this.getInventoryId(), salt);
  }

  @Get('/:address')
  @ApiOkResponse({
    type: AgreementDTO,
    description: 'Returns the agreement',
  })
  public async get(@Param('address') address: string): Promise<AgreementDTO> {
    const agreement = await this.agreementService.get(this.getInventoryId(), address);
    const filledEvents = await this.agreementService.getFilledEvents(this.getInventoryId(), address);

    return AgreementDTO.toDto(agreement, filledEvents);
  }

  @Get()
  @ApiOkResponse({
    type: [AgreementDTO],
    description: 'Returns all agreements',
  })
  public async getAll(): Promise<AgreementDTO[]> {
    const allAgreements = await this.agreementService.getAll(this.getInventoryId());

    return await Promise.all(
      allAgreements.map(async (agreement) => {
        return await AgreementDTO.toDto(
          agreement,
          await this.agreementService.getFilledEvents(this.getInventoryId(), agreement.address),
        );
      }),
    );
  }

  @Put('/:address/invalidate')
  @ApiBody({ type: InvalidateAgreementDTO })
  @ApiCreatedResponse({
    type: String,
    description: 'Invalidation transaction hash',
  })
  public async invalidate(
    @Param('address') address: string,
    @Body() dto: InvalidateAgreementDTO,
  ): Promise<TransactionHash> {
    return await this.agreementService.invalidate(this.getInventoryId(), address, dto);
  }

  @Put('/:address/amount')
  @ApiBody({ type: UpdateAgreementAmountDTO })
  @ApiCreatedResponse({
    type: String,
    description: 'Amount update transaction hash',
  })
  public async updateAmount(
    @Param('address') address: string,
    @Body() dto: UpdateAgreementAmountDTO,
  ): Promise<TransactionHash> {
    return await this.agreementService.updateAmount(this.getInventoryId(), address, dto);
  }

  @Put('/:address/metadata')
  @ApiBody({ type: UpdateAgreementMetadataDTO })
  @ApiCreatedResponse({
    type: String,
    description: 'Amount update transaction hash',
  })
  public async updateMetadata(
    @Param('address') address: string,
    @Body() dto: UpdateAgreementMetadataDTO,
  ): Promise<TransactionHash> {
    return await this.agreementService.updateMetadata(this.getInventoryId(), address, dto);
  }

}
