import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Wallet } from 'ethers';
import { BlockchainPropertiesService, getProviderWithFallback } from '@zero-labs/tokenization-api';

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

        const privateKey = await queryRunner.query(
            `SELECT "platformOperatorPrivateKey" FROM public.blockchain_properties;;`
        );

        await queryRunner.release();

        console.log(privateKey);

        return new Wallet(privateKey, provider);
    }
}
