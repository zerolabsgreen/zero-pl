import { Connection } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Wallet } from 'ethers';
import { BlockchainPropertiesService, decrypt, getProviderWithFallback } from '@zero-labs/tokenization-api';

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

        const encryptedPrivateKey = (await queryRunner.query(
            `SELECT "platformOperatorPrivateKey" FROM public.blockchain_properties;;`
        )).pop()?.platformOperatorPrivateKey;

        if (!encryptedPrivateKey) {
            throw new NotFoundException(`Unable to get the platformOperatorPrivateKey`);
        }

        const privateKey = decrypt(encryptedPrivateKey, process.env.ENCRYPTION_KEY);

        await queryRunner.release();

        return new Wallet(privateKey, provider);
    }
}
