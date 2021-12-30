/*
  Warnings:

  - A unique constraint covering the columns `[blockchainAddress]` on the table `Buyer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[blockchainAddress]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Buyer" ADD COLUMN     "blockchainAddress" TEXT;

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "blockchainAddress" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Buyer.blockchainAddress_unique" ON "Buyer"("blockchainAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Seller.blockchainAddress_unique" ON "Seller"("blockchainAddress");
