import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { pick } from 'lodash';
import polly from 'polly-js';

interface IssueCertificateDTO {
  deviceId: string;
  energyWh: string;
  fromTime: Date;
  toTime: Date;
  toSeller: string;
}

interface TransferCertificateDTO {
  id: number;
  fromAddress: string;
  toAddress: string;
  amount: string;
}

interface ClaimCertificateDTO {
  id: number,
  fromAddress: string,
  amount: string,
  claimData: {
    beneficiary?: string,
    location?: string,
    countryCode?: string,
    periodStartDate?: string,
    periodEndDate?: string,
    purpose?: string,
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
      baseURL: `${configService.get('ISSUER_API_BASE_URL')}/api`,
      headers: { 'X-Api-Key': configService.get('SUPERADMIN_API_KEY') }
    });
  }

  async getAccount(): Promise<{ blockchainAddress: string }> {
    try {
      const response = await this.axiosInstance.get('/account');
      return pick(response.data, ['blockchainAddress']);
    } catch (err) {
      this.logger.error(`error getting blockchain account: ${err}`);
      throw err;
    }
  }

  async issueCertificate(issueCertificateDTO: IssueCertificateDTO) {
    let lastAttempt: number = Date.now();
    const timeout = 90000;
    const checkingInterval = 2000;

    const issuerApiIssueCertDTO = {
      ...issueCertificateDTO,
      energy: issueCertificateDTO.energyWh,
      to: issueCertificateDTO.toSeller,
      fromTime: Math.floor(issueCertificateDTO.fromTime.getTime() / 1000),
      toTime: Math.floor(issueCertificateDTO.toTime.getTime() / 1000)
    };

    const numberOfRetries = Math.floor((lastAttempt - Date.now() + timeout) / checkingInterval);
    lastAttempt += Math.floor((Date.now() - lastAttempt) / checkingInterval) * checkingInterval;

    try {
      const responseData = (
        await this.axiosInstance.post('/certificate', issuerApiIssueCertDTO).catch((err) => {
          this.logger.error(`POST /certificate error response: ${err}`);
          this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
          throw err;
        })
      ).data;

      // waiting for transaction to be mined
      const certificate = await polly()
        .retry(numberOfRetries)
        .executeForPromise(async () => {
          await new Promise(resolve => setTimeout(resolve, Math.max(0, checkingInterval - (Date.now() - lastAttempt))));

          lastAttempt = Date.now();
          const certData = await this.getCertificateByTransactionHash(responseData.txHash);
          if (!certData) {
            this.logger.debug(`transaction ${responseData.txHash} not mined yet`);
            throw new Error('not mined yet');
          }

          return certData;
        });

      this.logger.debug(`submitting ${certificate.id} certificate transfer: ${issueCertificateDTO.toSeller} -> ${this.configService.get('ISSUER_CHAIN_ADDRESS')}`);

      await this.transferCertificate({
        id: certificate.id,
        fromAddress: issueCertificateDTO.toSeller,
        toAddress: this.configService.get('ISSUER_CHAIN_ADDRESS'),
        amount: issueCertificateDTO.energyWh
      });

      this.logger.debug(`submitted ${certificate.id} certificate transfer: ${issueCertificateDTO.toSeller} -> ${this.configService.get('ISSUER_CHAIN_ADDRESS')}`);

      return responseData;
    } catch (err) {
      this.logger.error(`error issuing certificate: ${err}`);
      this.logger.error(`payload: ${JSON.stringify(issuerApiIssueCertDTO)}`);
      throw err;
    }
  }

  async getCertificateByTransactionHash(txHash) {
    const blockchainAddress = this.configService.get('ISSUER_CHAIN_ADDRESS');
    try {
      this.logger.debug(`getting chain data for the certificate (blockchainAddress=${blockchainAddress}, txHash=${txHash})`);
      return (await this.axiosInstance.get(
        `/certificate/by-issuance-transaction/${txHash}`,
        { params: { blockchainAddress } }
      )).data[0];
    } catch (err) {
      if (err.isAxiosError) {
        const axiosError = err as AxiosError;

        if (axiosError.response) {
          if (axiosError.response.status === 404) {
            this.logger.debug(`no certificate data for blockchainAddress=${blockchainAddress} and txHash=${txHash}`);
            return null;
          }
        }
      }

      this.logger.error(`error getting certificate by transaction hash: ${err}`);

      throw err;
    }
  }

  async transferCertificate(transferCertificateDTO: TransferCertificateDTO) {
    const { id, fromAddress } = transferCertificateDTO;

    const requestPayload = {
      to: transferCertificateDTO.toAddress,
      amount: transferCertificateDTO.amount
    };

    try {
      this.logger.debug(`requesting PUT /certificate/${id}/transfer with ${JSON.stringify(requestPayload)}, fromAddress=${fromAddress}`);

      const res = await this.axiosInstance.put(
        `/certificate/${id}/transfer`,
        requestPayload,
        { params: { fromAddress } }
      ).catch((err) => {
        this.logger.error(`PUT /certificate/${id}/transfer error response: ${err}`);
        this.logger.error(`error response body: ${JSON.stringify(err.response.data)}`);
        throw err;
      });

      return res.data;
    } catch (err) {
      if (err.isAxiosError) {
        const axiosError = err as AxiosError;

        if (axiosError.response) {
          if (axiosError.response.status === 404) {
            this.logger.error(`cert. transfer error: no on-chain certificate data for certificate id=${id} and fromAddress=${fromAddress}`);
            throw new NotFoundException(`no on-chain certificate data for certificate id=${id}`);
          }
        }
      }

      this.logger.error(`error transferring certificate: ${err}`);
      this.logger.error(`payload: ${JSON.stringify(transferCertificateDTO)}`);
      throw err;
    }
  }

  async claimCertificate(claimCertificateDTO: ClaimCertificateDTO) {
    let lastAttempt: number = Date.now();
    const timeout = 60000;
    const checkingInterval = 1000;
    const numberOfRetries = Math.floor((lastAttempt - Date.now() + timeout) / checkingInterval);

    const { id, fromAddress, ...requestPayload } = claimCertificateDTO;

    try {
      this.logger.debug(`requesting PUT /certificate/${id}/claim with ${JSON.stringify(requestPayload)}`);

      const res = await polly()
        .logger((err) => {
          this.logger.debug(err.response?.data?.message || err);
        })
        .handle((err) => {
          return !!(
            err.isAxiosError &&
            err.response &&
            err.response.status === 400 &&
            err.response.data.message.match(/has a balance of [0-9]+ but wants to claim [0-9]+/)
          );
        })
        .retry(numberOfRetries)
        .executeForPromise(async () => {
          await new Promise(resolve => setTimeout(resolve, Math.max(0, checkingInterval - (Date.now() - lastAttempt))));

          lastAttempt = Date.now();
          return await this.axiosInstance.put(
            `/certificate/${id}/claim`,
            requestPayload,
            { params: { fromAddress } }
          );
        });

      return res.data;
    } catch (err) {
      if (err.isAxiosError) {
        const axiosError = err as AxiosError;

        if (axiosError.response) {
          switch (axiosError.response.status) {
            case 400:
              this.logger.error(`issuer API error: ${JSON.stringify(axiosError.response.data)}`);
              throw new Error(`issuer API error: ${JSON.stringify(axiosError.response.data)}`);
            case 404:
              this.logger.error(`cert. claim error: no on-chain certificate data for certificate id=${id} to claim from address ${fromAddress}`);
              throw new NotFoundException(`certificate id=${id} not available for claiming from address ${fromAddress}`);
          }
        }
      }

      this.logger.error(`error transferring certificate: ${err}`);
      this.logger.error(`payload: ${JSON.stringify(claimCertificateDTO)}`);
      throw err;
    }
  }

  async getCertificateEvents(certificateId: number) {
    try {
      this.logger.debug(`getting events for certificateId=${certificateId}`);
      return (await this.axiosInstance.get(`/certificate/${certificateId}/events`)).data
    } catch (err) {
      if (err.isAxiosError) {
        const axiosError = err as AxiosError;

        if (axiosError.response) {
          if (axiosError.response.status === 404) {
            this.logger.warn(`no events for certificateId=${certificateId}`);
            return null;
          }
        }
      }

      this.logger.error(`error getting certificate by transaction hash: ${err}`);

      throw err;
    }
  }
}
