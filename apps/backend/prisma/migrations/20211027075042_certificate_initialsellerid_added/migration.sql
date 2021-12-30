/*
  Warnings:

  - Added the required column `initialSellerId` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "initialSellerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Certificate" ADD FOREIGN KEY ("initialSellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;
