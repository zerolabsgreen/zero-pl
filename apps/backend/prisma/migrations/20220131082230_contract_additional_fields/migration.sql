/*
  Warnings:

  - Added the required column `contractDate` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryDate` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "contractDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deliveryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "externalId" INTEGER;
