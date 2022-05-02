import { BigNumber } from 'ethers';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiOkResponse, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ExceptionInterceptor } from '@energyweb/origin-backend-utils';
import {
    Certificate,
    CertificateDTO,
    CertificateEvent,
    certificateToDto,
    ClaimCertificateCommand,
    GetAllCertificateEventsQuery,
    GetAllCertificatesQuery,
    GetCertificateByTxHashQuery,
    GetCertificateQuery,
    IssueCertificateCommand,
    TransferCertificateCommand,
    TxHashDTO
} from '@energyweb/issuer-api';

import { IssueCertificateDTO } from './dto/issue-certificate.dto';
import { TransferCertificateDTO } from './dto/transfer-certificate.dto';
import { ClaimCertificateDTO } from './dto/claim-certificate.dto';
import { IssuerGuard } from '../auth/issuer.guard';

@ApiSecurity('api-key')
@ApiTags('certificates')
@Controller('certificate')
@UseInterceptors(ExceptionInterceptor)
@UsePipes(ValidationPipe)
@UseGuards(IssuerGuard)
export class CertificateController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get('/:id')
    @ApiResponse({
        status: HttpStatus.OK,
        type: CertificateDTO,
        description: 'Returns a Certificate'
    })
    public async get(
        @Param('id', new ParseIntPipe()) id: number,
        @Query('blockchainAddress') blockchainAddress: string
    ): Promise<CertificateDTO> {
        const certificate = await this.queryBus.execute<GetCertificateQuery, Certificate>(
            new GetCertificateQuery(id)
        );

        if (!certificate) {
            throw new NotFoundException(`Certificate with ID ${id} does not exist.`);
        }

        return certificateToDto(certificate, blockchainAddress);
    }

    @Get('/by-issuance-transaction/:txHash')
    @UseGuards(IssuerGuard)
    @ApiOkResponse({
        type: [CertificateDTO],
        description: 'Returns Certificates that were created in the transaction'
    })
    public async getByTxHash(
        @Query('blockchainAddress') blockchainAddress: string,
        @Param('txHash') txHash: string
    ): Promise<CertificateDTO[]> {
        const certificates = await this.queryBus.execute<GetCertificateByTxHashQuery,
            Certificate[]>(new GetCertificateByTxHashQuery(txHash));

        if (certificates?.length === 0) {
            throw new NotFoundException(
                `No certificates were issued in the tx with hash ${txHash}.`
            );
        }

        return certificates.map((cert) => certificateToDto(cert, blockchainAddress));
    }

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        type: [CertificateDTO],
        description: 'Returns all Certificates'
    })
    public async getAll(
        @Query('blockchainAddress') blockchainAddress: string
    ): Promise<CertificateDTO[]> {
        const certificates = await this.queryBus.execute<GetAllCertificatesQuery, Certificate[]>(
            new GetAllCertificatesQuery()
        );

        const userCertificates = certificates.filter(
            (cert) =>
                BigNumber.from(cert.owners?.[blockchainAddress] ?? 0) > BigNumber.from(0) ||
                BigNumber.from(cert.claimers?.[blockchainAddress] ?? 0) > BigNumber.from(0)
        );

        return Promise.all(
            userCertificates.map((certificate) => certificateToDto(certificate, blockchainAddress))
        );
    }

    @Post()
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: TxHashDTO,
        description: 'Triggers an issuance transaction and returns the transaction hash'
    })
    @ApiBody({ type: IssueCertificateDTO })
    public async issue(@Body() dto: IssueCertificateDTO): Promise<TxHashDTO> {
        const tx = await this.commandBus.execute(
            new IssueCertificateCommand(
                dto.to,
                dto.energyWh,
                dto.fromTime,
                dto.toTime,
                dto.deviceId,
                dto.to
            )
        );

        return { txHash: tx.hash };
    }

    @Put('/:id/transfer')
    @ApiBody({ type: TransferCertificateDTO })
    @ApiResponse({
        status: HttpStatus.OK,
        type: TxHashDTO,
        description: 'Triggers a Transfer transaction and returns the transaction hash'
    })
    public async transfer(
        @Query('fromAddress') fromAddress: string,
        @Param('id', new ParseIntPipe()) certificateId: number,
        @Body() dto: TransferCertificateDTO
    ): Promise<TxHashDTO> {
        try {
            const tx = await this.commandBus.execute(
                new TransferCertificateCommand(certificateId, fromAddress, dto.to, dto.amount)
            );

            return { txHash: tx.hash };
        } catch (err) {
            // TODO: investigate why this workaround is needed
            if (err.name === 'NotFoundException') {
                throw new NotFoundException(err.message);
            }

            throw err;
        }
    }

    @Put('/:id/claim')
    @ApiBody({ type: ClaimCertificateDTO })
    @ApiResponse({
        status: HttpStatus.OK,
        type: TxHashDTO,
        description: 'Triggers a Claim transaction and returns the transaction hash'
    })
    public async claim(
        @Query('fromAddress') fromAddress: string,
        @Param('id', new ParseIntPipe()) certificateId: number,
        @Body() dto: ClaimCertificateDTO
    ): Promise<TxHashDTO> {
        try {
            const tx = await this.commandBus.execute(
                new ClaimCertificateCommand(certificateId, dto.claimData, fromAddress, dto.amount)
            );

            return { txHash: tx.hash };
        } catch (err) {
            // TODO: investigate why this workaround is needed
            if (err.name === 'NotFoundException') {
                throw new NotFoundException(err.message);
            }
            if (err.name === 'BadRequestException') {
                throw new BadRequestException(err.message);
            }

            throw err;
        }
    }

    @Get('/:id/events')
    @ApiResponse({
        status: HttpStatus.OK,
        type: [CertificateEvent],
        description: 'Returns all the events for a Certificate'
    })
    public async getAllEvents(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<CertificateEvent[]> {
        return this.queryBus.execute(new GetAllCertificateEventsQuery(id));
    }
}
