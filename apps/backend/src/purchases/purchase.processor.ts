import { Process, Processor, OnQueueActive } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Purchase } from '@prisma/client';
import { Job } from 'bull';
import polly = require('polly-js');

import { IssuerService } from '../issuer/issuer.service';
import { PrismaService } from '../prisma/prisma.service';
import { PurchasesService } from './purchases.service';
import { getClaimData } from './utils';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ClaimPurchaseData {
  purchaseId: Purchase['id'];
  previousTx?: string; // Previous transaction that needs to be waited on
}

@Processor('purchase')
export class PurchaseProcessor {
  private readonly logger = new Logger(PurchaseProcessor.name, {
    timestamp: true,
  });

  constructor(
    private prisma: PrismaService,
    private readonly purchasesService: PurchasesService,
    private readonly issuerService: IssuerService,
  ) {}

  @OnQueueActive()
  onQueueActive(jobId: number) {
    this.logger.debug(`Received job ${JSON.stringify(jobId)}`);
  }

  @Process('claim')
  async claimPurchase({ data: { purchaseId, previousTx } }: Job<ClaimPurchaseData>) {
    const purchase = await this.purchasesService.findOne(purchaseId);

    if (previousTx) {
      await this.waitForTxMined(previousTx);
    }

    const txHash = await this.issuerService.claimCertificate({
      id: Number(purchase.certificate.onchainId),
      from: purchase.buyer.blockchainAddress,
      to: purchase.buyer.blockchainAddress,
      amount: purchase.recsSoldWh,
      claimData: getClaimData(purchase)
    });

    await this.prisma.purchase.update({
      where: {
        id: purchase.id
      }, 
      data: { txHash }
    }).catch(err => {
      this.logger.error(`error updating the purchase with txHash: ${err}`);
      throw err;
    });
  }

  private async waitForTxMined(txHash: string): Promise<void> {
    const TIMEOUT = 180; // Seconds
    const RETRY_EVERY = 2; // Seconds
    const RETRY_INTERVALS = Array(TIMEOUT / RETRY_EVERY).fill(RETRY_EVERY * 1e3);

    await polly()
        .handle(() => { return true; })
        .waitAndRetry(RETRY_INTERVALS)
        .executeForPromise(async () => {
            console.log(`Checking if tx ${txHash} was mined...`);
            await this.issuerService.getTransaction(txHash);
            console.log(`Tx ${txHash} was mined.`);
    });

    console.log(`Waiting a few seconds for the mined tx to get picked up...`);
    await sleep(5e3); // Give some time to the API to detect the tx
  }
}
