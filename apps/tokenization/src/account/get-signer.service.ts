import { Connection } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { providers, Wallet } from 'ethers';
import { InventoryService, decrypt } from '@zero-labs/tokenization-api';

@Injectable()
export class SignerService {
    constructor(
        private connection: Connection,
        private readonly inventoryService: InventoryService,
    ) {}

    public async get(): Promise<Wallet> {
        const [{ rpcNode }] = await this.inventoryService.getAll();
        const provider = new providers.JsonRpcProvider(rpcNode);

        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();

        const encryptedPrivateKey = (await queryRunner.query(
            `SELECT "platformOperatorPrivateKey" FROM public.inventory;`
        )).pop()?.platformOperatorPrivateKey;

        if (!encryptedPrivateKey) {
            throw new NotFoundException(`Unable to get the platformOperatorPrivateKey`);
        }

        const privateKey = decrypt(encryptedPrivateKey, process.env.ENCRYPTION_KEY);

        await queryRunner.release();

        return new Wallet(privateKey, provider);
    }
}
