/*
  Warnings:

  - You are about to drop the column `beneficiary` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `redemptionDate` on the `Certificate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "beneficiary",
DROP COLUMN "redemptionDate";

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "beneficiary" TEXT,
ADD COLUMN     "purpose" TEXT,
ADD COLUMN     "redemptionDate" TIMESTAMP(3);
