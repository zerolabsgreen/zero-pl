import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CertificateService, CertificateWithOwnersDTO, ClaimDTO, EventsRequestDTO, EventsResponseDTO, ICertificate, InventoryService, TransactionPendingDTO, TransferBatchDTO, TransferDTO } from '@zero-labs/tokenization-api';
import { IssuerGuard } from '../auth/issuer.guard';
import { InventoryIdController } from '../inventory/InventoryIdController';

@ApiSecurity('api-key')
@ApiTags('certificates')
@Controller('certificate')
@UsePipes(ValidationPipe)
@UseGuards(IssuerGuard)
export class CertificateController extends InventoryIdController {

    constructor(
        private readonly certificateService: CertificateService,
        inventory: InventoryService,
    ) {
        super(inventory);
    }

    @Get('/:id')
    @ApiOkResponse({
        type: CertificateWithOwnersDTO,
        description: 'Returns a Certificate',
    })
    public async get(@Param('id') id: string): Promise<CertificateWithOwnersDTO> {
        return this.certificateService.get(this.getInventoryId(), id);
    }

    @Get()
    @ApiOkResponse({
        type: [CertificateWithOwnersDTO],
        description: 'Returns all Certificates',
    })
    public async getAll(): Promise<CertificateWithOwnersDTO[]> {
        return this.certificateService.getAll(this.getInventoryId());
    }

    @Post('/transfer/batch')
    @ApiBody({ type: TransferBatchDTO })
    @ApiCreatedResponse({
        type: TransactionPendingDTO,
        description: 'Transfers the certificates and returns the tx hash',
    })
    public async transferBatch(
        @Body() transfers: TransferBatchDTO,
    ): Promise<TransactionPendingDTO> {
        return this.certificateService.transferBatch(this.getInventoryId(), transfers);
    }

    @Post('/transfer/:id')
    @ApiBody({ type: TransferDTO })
    @ApiCreatedResponse({
        type: TransactionPendingDTO,
        description: 'Transfers the certificate and returns the tx hash',
    })
    public async transfer(
        @Param('id') id: string,
        @Body() { from, to, amount }: TransferDTO,
    ): Promise<TransactionPendingDTO> {
        return this.certificateService.transfer(this.getInventoryId(), id, from, to, amount);
    }

    @Post('/claim/:id')
    @ApiBody({ type: ClaimDTO })
    @ApiCreatedResponse({
        type: TransactionPendingDTO,
        description: 'Claims and returns the tx hash',
    })
    public async claim(
        @Param('id') id: string,
        @Body() { from, claimData, to, amount }: ClaimDTO,
    ): Promise<TransactionPendingDTO> {
        return this.certificateService.claim(this.getInventoryId(), id, from, claimData, to, amount);
    }

    @Get('/id/:txHash')
    @ApiOkResponse({
        type: [String],
        description: 'Returns certificate IDs that were created in the transaction',
    })
    public async getCertificatesCreatedIn(
        @Param('txHash') txHash: string,
    ): Promise<ICertificate['id'][]> {
        return this.certificateService.getCertificatesMintedIn(this.getInventoryId(), txHash);
    }

    @Get(':id/events')
    @ApiOkResponse({
        type: EventsResponseDTO,
        description:
        'Returns paginated and filtered set of available certificate events',
    })
    @ApiQuery({
        name: 'currentPage',
        type: Number,
        required: false,
    })
    @ApiQuery({
        name: 'pageSize',
        type: Number,
        required: false,
    })
    @ApiQuery({
        name: 'eventType',
        type: String,
        required: false,
    })
    public async getEventsForCertificate(
        @Param('id') id: string,
        @Query() { currentPage, pageSize, eventType }: EventsRequestDTO,
    ): Promise<EventsResponseDTO> {
        return this.certificateService.getEventsForCertificate(
            this.getInventoryId(),
            id,
            currentPage,
            pageSize,
            eventType,
        );
    }
}