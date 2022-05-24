/*
  Warnings:

  - You are about to drop the column `redemptionDate` on the `Purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "redemptionDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "redemptionDate";
