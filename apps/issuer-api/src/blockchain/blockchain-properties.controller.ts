import {
    Controller,
    Get,
    HttpStatus,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BlockchainPropertiesDTO, BlockchainPropertiesService } from '@energyweb/issuer-api';
import { ExceptionInterceptor } from '@energyweb/origin-backend-utils';
import { IssuerGuard } from "../auth/issuer.guard";

@ApiSecurity('api-key')
@ApiTags('blockchain-properties')
@Controller('blockchain-properties')
@UseInterceptors(ExceptionInterceptor)
@UsePipes(ValidationPipe)
@UseGuards(IssuerGuard)
export class BlockchainPropertiesController {
    constructor(private readonly blockchainPropertiesService: BlockchainPropertiesService) {}

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        type: BlockchainPropertiesDTO,
        description: 'Returns blockchain properties'
    })
    public async get(): Promise<BlockchainPropertiesDTO> {
        return this.blockchainPropertiesService.dto();
    }
}
