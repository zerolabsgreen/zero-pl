/*
  Warnings:

  - You are about to drop the `FilesOnPurchases` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[attestationId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "FilesOnPurchases" DROP CONSTRAINT "FilesOnPurchases_fileId_fkey";

-- DropForeignKey
ALTER TABLE "FilesOnPurchases" DROP CONSTRAINT "FilesOnPurchases_purchaseId_fkey";

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "attestationId" TEXT;

-- DropTable
DROP TABLE "FilesOnPurchases";

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_attestationId_key" ON "Purchase"("attestationId");
