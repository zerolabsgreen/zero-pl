import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Wallet } from 'ethers';
import { BlockchainPropertiesService } from '@energyweb/issuer-api';
import { getProviderWithFallback } from '@energyweb/utils-general';

@Injectable()
export class SignerService {

    constructor(
        private connection: Connection,
        private readonly blockchainPropertiesService: BlockchainPropertiesService,
    ) {}

    public async get(): Promise<Wallet> {
        const { rpcNode } = await this.blockchainPropertiesService.get();
        const provider = getProviderWithFallback(rpcNode);

        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        const privateKey = await queryRunner.query(
            `SELECT "platformOperatorPrivateKey" FROM public.issuer_signer;`
        );

        console.log(privateKey);

        return new Wallet(privateKey, provider);
    }
}
