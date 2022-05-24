import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { pick } from 'lodash';
import polly from 'polly-js';

type TxHash = string;
type UnixTimestamp = number;

const TIMEOUT = 90; // Seconds
const RETRY_EVERY = 2; // Seconds
const RETRY_INTERVALS = Array.from({ length: TIMEOUT / RETRY_EVERY }, (v, i) => i * RETRY_EVERY + 1).map(seconds => seconds * 1e3); // Returns [1, 3, 5...]
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ISetRedemptionStatementDTO {
  value: string;
  storagePointer?: string; 
}

export interface TxReceiptDTO {
  to: string;
  from: string;
  contractAddress: string;
  gasUsed: string;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  confirmations: number;
  cumulativeGasUsed: string;
  timestamp: UnixTimestamp;
}

export interface MintDTO {
  to: string;
  amount: string;
  certificate: {
    generationStartTime: number;
    generationEndTime: number;
    productType: string;
    generator: {
      id: string;
      name: string;
      energySource: string;
      region: string;
      country: string;
      commissioningDate: number;
      capacity: string;
    };
  };
  data: string;
}

interface TransferCertificateDTO {
  id: number;
  from: string;
  to: string;
  amount: string;
}

interface ClaimCertificateDTO {
  id: number,
  from: string,
  amount: string,
  claimData: {
    beneficiary: string,
    region: string,
    countryCode: string,
    periodStartDate: string,
    periodEndDate: string,
    purpose: string,
    consumptionEntityID: string;
    proofID: string;
  }
}

@Injectable()
export class IssuerService {
  private readonly logger = new Logger(IssuerService.name, { timestamp: true });
  private readonly axiosInstance: AxiosInstance;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.axiosInstance = axios.create({
      baseURL: `${configService.get('TOKENIZATION_BASE_URL')}/api`,
      headers: { 'X-Api-Key': configService.get('SUPERADMIN_API_KEY') }
    });
  }

  async getAccount(): Promise<{ blockchainAddress: string }> {
    try {
      const response = await this.axiosInstance.get('/account');
      return pick(response.data, ['blockchainAddress']);
    } catch (err) {
      this.logger.error(`GET /account error: ${err.message}`);
      this.logger.error(`error getting blockchain account: ${JSON.stringify(err.response.data)}`);
      throw err;
    }
  }

  async createBatch(): Promise<number> {
    const response = (
      await this.axiosInstance.post('/batch').catch((err) => {
        this.logger.error(`POST /batch error response: ${err}`);
        this.logger.error(`error response body: ${err.message}`);
        throw err;
      })
    );

    await this.waitForTxMined(response.data.txHash);

    const batchId = await polly()
      .waitAndRetry(RETRY_INTERVALS)
      .executeForPromise(async () => {
        const certData = await this.getBatchByTransactionHash(response.data.txHash);
        if (!certData) {
          this.logger.debug(`transaction ${response.data.txHash} not mined yet`);
          throw new Error('not mined yet');
        }

        return certData;
      });

    return batchId;
  }

  async setRedemptionStatement(
    batchId: number,
    dto: ISetRedemptionStatementDTO
  ): Promise<TxHash> {
    let txHash: string;

    this.logger.debug(`[Batch ${batchId}] Setting redemption statement to: ${JSON.stringify(dto)}`);

    try {
      const responseData = (
        await this.axiosInstance.post(
          `/batch/redemption-statement/${batchId}`,
          dto
        ).catch((err) => {
          this.logger.error(`POST /batch/redemption-statement/${batchId} error response: ${err}`);
          this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
          throw err;
        })
      ).data;

      txHash = responseData.txHash;
    } catch (err) {
      this.logger.error(`error setting a redemption statement: ${err}`);
      this.logger.error(`payload: ${err.message}`);
      throw err;
    }

    this.logger.debug(`[${txHash}] Waiting to be mined...`);

    await this.waitForTxMined(txHash);

    this.logger.debug(`[${txHash}] Mined.`);

    await polly()
      .waitAndRetry(RETRY_INTERVALS)
      .executeForPromise(async () => {
        const response = await this.axiosInstance.get(
          `/batch/${batchId}`
        );

        if (!response.data.redemptionStatement) {
          throw new NotFoundException(`Redemption statement not detected yet for batch ${batchId}`);
        }
      });

    return txHash;
  }

  async mint(
    batchId: number,
    dto: MintDTO[]
  ): Promise<number[]> {
    let txHash: string;

    try {
      const responseData = (
        await this.axiosInstance.post(
          `/batch/mint/${batchId}`,
          dto
        ).catch((err) => {
          this.logger.error(`POST /batch/mint/${batchId} error response: ${err}`);
          this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
          throw err;
        })
      ).data;

      txHash = responseData.txHash;
    } catch (err) {
      this.logger.error(`error minting: ${err}`);
      this.logger.error(`payload: ${err.message}`);
      throw err;
    }

    await this.waitForTxMined(txHash);

    const ids = await polly()
      .waitAndRetry(RETRY_INTERVALS)
      .executeForPromise(async () => {
        const response = await this.axiosInstance.get(`/certificate/id/${txHash}`);

        if (response.data.length < 1) {
          throw new NotFoundException(`No certificates minted in ${txHash}`);
        }

        return response.data.map(id => Number(id));
      });

    return ids;
  }

  async getBatchByTransactionHash(txHash: string): Promise<number> {
    try {
      this.logger.debug(`getting chain data for the batch (txHash=${txHash})`);
      const response = (await this.axiosInstance.get(
        `/batch/id/${txHash}`
      ));
      return Number(response.data.pop());
    } catch (err) {
      if (err.isAxiosError) {
        const axiosError = err as AxiosError;

        if (axiosError.response) {
          if (axiosError.response.status === 404) {
            this.logger.debug(`no batch data for txHash=${txHash}`);
            return null;
          }
        }
      }

      this.logger.error(`error getting batch by transaction hash: ${err}`);

      throw err;
    }
  }

  async transferCertificate(transferCertificateDTO: TransferCertificateDTO): Promise<string> {
    const { id, ...requestPayload } = transferCertificateDTO;

    this.logger.debug(`requesting POST /certificate/${id}/transfer with ${JSON.stringify(requestPayload)}`);

    const res = await this.axiosInstance.post(
      `/certificate/transfer/${id}`,
      requestPayload
    ).catch((err) => {
      this.logger.error(`POST /certificate/transfer/${id} error response: ${err}`);
      this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
      throw err;
    });

    await this.waitForTxMined(res.data.txHash);

    return res.data.txHash;
  }

  async claimCertificate(claimCertificateDTO: ClaimCertificateDTO): Promise<string> {
    const { id,  ...requestPayload } = claimCertificateDTO;

    this.logger.debug(`requesting POST /certificate/claim/${id} with ${JSON.stringify(requestPayload)}`);

    const res = await this.axiosInstance.post(
      `/certificate/claim/${id}`,
      requestPayload
    ).catch((err) => {
      this.logger.error(`POST /certificate/claim/${id} error response: ${err}`);
      this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
      throw err;
    });

    await this.waitForTxMined(res.data.txHash);

    return res.data.txHash;
  }

  async getCertificateEvents(certificateId: number): Promise<any[]> {
    // try {
    //   this.logger.debug(`getting events for certificateId=${certificateId}`);
    //   return (await this.axiosInstance.get(`/certificate/${certificateId}/events`)).data
    // } catch (err) {
    //   if (err.isAxiosError) {
    //     const axiosError = err as AxiosError;

    //     if (axiosError.response) {
    //       if (axiosError.response.status === 404) {
    //         this.logger.warn(`no events for certificateId=${certificateId}`);
    //         return null;
    //       }
    //     }
    //   }

    //   this.logger.error(`error getting certificate by transaction hash: ${err}`);

    //   throw err;
    // }
    return [];
  }

  public async waitForTxMined(txHash: string): Promise<TxReceiptDTO> {
    await polly()
      .waitAndRetry(RETRY_INTERVALS)
      .executeForPromise(async () => {
        await this.axiosInstance.get(
          `/blockchain/${txHash}`
        );
      });

      const waitTimeSec = 2;

      this.logger.debug(`[${txHash}] Transaction has been mined. Waiting for ${waitTimeSec} seconds for the tokenization API to detect the tx...`);
      await sleep(waitTimeSec * 1e3); // Give time to the Tokenization API to detect the transaction and make changes

      return (await this.axiosInstance.get(`/blockchain/${txHash}`)).data;
  }
}
