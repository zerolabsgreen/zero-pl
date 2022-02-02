/*
  Warnings:

  - You are about to drop the column `contractId` on the `Certificate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_contractId_fkey";

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "contractId";

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "contractId" TEXT;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;
