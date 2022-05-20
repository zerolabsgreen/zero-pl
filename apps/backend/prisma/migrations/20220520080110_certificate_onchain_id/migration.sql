/*
  Warnings:

  - A unique constraint covering the columns `[onchainId]` on the table `Certificate` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "onchainId" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_onchainId_key" ON "Certificate"("onchainId");
