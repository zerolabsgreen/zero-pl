import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { utils } from 'ethers';
import { pick } from 'lodash';
import { TxHash, UnixTimestamp } from '../utils/types';

export type CertificateIds = { onchainId: string, certificateId: string };

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
  to: string;
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

type TxHashResponseDTO = { txHash: string };

@Injectable()
export class IssuerService {
  private readonly logger = new Logger(IssuerService.name, { timestamp: true });
  private readonly axiosInstance: AxiosInstance;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.axiosInstance = axios.create({
      baseURL: `${this.configService.get('TOKENIZATION_BASE_URL')}/api`,
      headers: { 'X-Api-Key': this.configService.get('SUPERADMIN_API_KEY') }
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

  async setRedemptionStatement(
    batchId: number,
    dto: ISetRedemptionStatementDTO
  ): Promise<TxHash> {
    this.logger.debug(`[Batch ${batchId}] Setting redemption statement to: ${JSON.stringify(dto)}`);

    const response = (
      await this.axiosInstance.post(
        `/batch/redemption-statement/${batchId}`,
        dto
      ).catch((err) => {
        this.logger.error(`POST /batch/redemption-statement/${batchId} error response: ${err}`);
        this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
        throw err;
      })
    );

    return response.data.txHash;
  }

  async mint(
    batchId: number,
    dto: MintDTO[]
  ): Promise<TxHash> {
    const response = (
      await this.axiosInstance.post<any, AxiosResponse<TxHashResponseDTO>, MintDTO[]>(
        `/batch/mint/${batchId}`,
        dto
      ).catch((err) => {
        this.logger.error(`POST /batch/mint/${batchId} error response: ${err}`);
        this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
        throw err;
      })
    );

    return response.data.txHash;
  }

  async transferCertificate(transferCertificateDTO: TransferCertificateDTO): Promise<TxHash> {
    const { id, ...requestPayload } = transferCertificateDTO;

    this.logger.debug(`requesting POST /certificate/${id}/transfer with ${JSON.stringify(requestPayload)}`);

    const res = await this.axiosInstance.post<any, AxiosResponse<TxHashResponseDTO>, Omit<TransferCertificateDTO, 'id'>>(
      `/certificate/transfer/${id}`,
      requestPayload
    ).catch((err) => {
      this.logger.error(`POST /certificate/transfer/${id} error response: ${err}`);
      this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
      throw err;
    });

    return res.data.txHash;
  }

  async claimCertificate(claimCertificateDTO: ClaimCertificateDTO): Promise<TxHash> {
    const { id,  ...requestPayload } = claimCertificateDTO;

    this.logger.debug(`requesting POST /certificate/claim/${id} with ${JSON.stringify(requestPayload)}`);

    const res = await this.axiosInstance.post<any, AxiosResponse<{ txHash: string }>, Omit<ClaimCertificateDTO, 'id'>>(
      `/certificate/claim/${id}`,
      requestPayload
    ).catch((err) => {
      this.logger.error(`POST /certificate/claim/${id} error response: ${err}`);
      this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
      throw err;
    });

    return res.data.txHash;
  }

  async getCertificateEvents(certificateId: string): Promise<any[]> {
    const res = await this.axiosInstance.get(`/certificate/${certificateId}/events`)
      .catch((err) => {
        this.logger.error(`GET /certificate/${certificateId}/events error response: ${err}`);
        this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
        throw err;
      });

    return res.data.dataSet;
  }

  public async getCertificatesMintedIn(txHash: string): Promise<CertificateIds[]> {
    const res = await this.axiosInstance.get<any, AxiosResponse<CertificateIds['onchainId'][]>, CertificateIds['onchainId'][]>(
      `/certificate/id/${txHash}`
    ).catch((err) => {
      this.logger.error(`GET /certificate/id/${txHash} error response: ${err}`);
      this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
      throw err;
    });

    const onchainIds = res.data;

    const certificates: CertificateIds[] = [];

    for (const onchainId of onchainIds) {
      const res = await this.axiosInstance.get(
        `/certificate/${onchainId}`
      ).catch((err) => {
        this.logger.error(`GET /certificate/${onchainId} error response: ${err}`);
        this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
        throw err;
      });

      const [certificateId] = utils.defaultAbiCoder.decode(['string'], res.data.data);

      certificates.push({
        onchainId,
        certificateId
      });
    }

    return certificates;
  }

  public async getTransaction(txHash: string): Promise<TxReceiptDTO> {
    const res = await this.axiosInstance.get<any, AxiosResponse<TxReceiptDTO>, TxReceiptDTO>(
      `/blockchain/${txHash}`
    ).catch((err) => {
      this.logger.error(`GET /blockchain/${txHash} error response: ${err}`);
      this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
      throw err;
    });

    return res.data;
  }
}
