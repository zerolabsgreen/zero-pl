/*
  Warnings:

  - You are about to drop the column `country` on the `Contract` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "country",
ADD COLUMN     "countries" "CountryEnumType"[];
