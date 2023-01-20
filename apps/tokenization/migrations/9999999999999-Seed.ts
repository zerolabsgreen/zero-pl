/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Wallet } from 'ethers';
import {
  BatchFactory__factory,
  CertificateContractsDev,
} from '@zero-labs/tokenization';
import { encrypt, getProviderWithFallback } from '@zero-labs/tokenization-api';

require('dotenv').config({ path: '.env' });

export class Seed9999999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.seedBlockchain(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}

  private async seedBlockchain(queryRunner: QueryRunner) {
    const loadVariables = [
      'ENVIRONMENT',
      'WEB3',
      'DEPLOY_PRIVATE_KEY',
      'SMART_CONTRACT_REGISTRY',
      'SMART_CONTRACT_BATCH_FACTORY',
      'SMART_CONTRACT_AGREEMENT_FACTORY',
      'ENCRYPTION_KEY',
    ];

    const envVariables = loadVariables.reduce(
      (a, v) => ({ ...a, [v]: process.env[v] }),
      {},
    );

    const requiredVariables = ['WEB3', 'DEPLOY_PRIVATE_KEY', 'ENCRYPTION_KEY'];
    requiredVariables.forEach((variable) => {
      if (!envVariables[variable]) {
        throw new Error(`process.env.${variable} is undefined`);
      }
    });

    const [primaryRpc, fallbackRpc] = envVariables['WEB3'].split(';');
    const provider = getProviderWithFallback(primaryRpc, fallbackRpc);

    if (envVariables['ENVIRONMENT'] === 'dev') {
      const deployer = new Wallet(
        String(envVariables['DEPLOY_PRIVATE_KEY']),
        provider,
      );
      console.log(`Deploying contracts from ${deployer.address}...`);

      const certificateContracts = new CertificateContractsDev(deployer);
      await certificateContracts.deploy();

      await queryRunner.query(
        `INSERT INTO public.inventory (
                  "netId", "registry", "batchFactory", "agreementFactory", "topic", "rpcNode", "rpcNodeFallback", "platformOperatorPrivateKey", "registryDeployTransaction", "batchFactoryDeployTransaction"
              ) VALUES (${provider.network.chainId}, '${
          certificateContracts.registry.address
        }', '${certificateContracts.batchFactory.address}', '${
          certificateContracts.agreementFactory.address
        }', '${certificateContracts.topic}', '${primaryRpc}', '${
          fallbackRpc ?? ''
        }', '${encrypt(deployer.privateKey, process.env.ENCRYPTION_KEY)}', '${
          certificateContracts.registryDeployTransaction ?? ''
        }', '${certificateContracts.batchFactoryDeployTransaction ?? ''}')`,
      );

      return;
    }

    if (
      !envVariables['SMART_CONTRACT_REGISTRY'] ||
      !envVariables['SMART_CONTRACT_BATCH_FACTORY'] ||
      !envVariables['SMART_CONTRACT_AGREEMENT_FACTORY']
    ) {
      throw new Error('Please set the SMART_CONTRACT_* env variables');
    }

    const batchFactory = BatchFactory__factory.connect(
      envVariables['SMART_CONTRACT_BATCH_FACTORY'],
      provider,
    );
    const topic = await batchFactory.topic();

    await queryRunner.query(
      `INSERT INTO public.blockchain_properties (
                "netId", "registry", "batchFactory", "agreementFactory", "topic", "rpcNode", "rpcNodeFallback", "platformOperatorPrivateKey", "registryDeployTransaction", "batchFactoryDeployTransaction"
            ) VALUES (${provider.network.chainId}, '${
        envVariables['SMART_CONTRACT_REGISTRY']
      }', '${envVariables['SMART_CONTRACT_BATCH_FACTORY']}', '${
        envVariables['SMART_CONTRACT_AGREEMENT_FACTORY']
      }', '${topic.toString()}', '${primaryRpc}', '${
        fallbackRpc ?? ''
      }', '${encrypt(
        envVariables['DEPLOY_PRIVATE_KEY'],
        envVariables['ENCRYPTION_KEY'],
      )}', '', '')`,
    );
  }
}