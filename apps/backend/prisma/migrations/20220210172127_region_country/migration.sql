/*
  Warnings:

  - You are about to drop the column `countries` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Contract` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "countries",
DROP COLUMN "region";

-- CreateTable
CREATE TABLE "RegionCountry" (
    "id" SERIAL NOT NULL,
    "region" TEXT,
    "country" "CountryEnumType" NOT NULL,

    CONSTRAINT "RegionCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionCountryOnContracts" (
    "contractId" TEXT NOT NULL,
    "regionCountryId" INTEGER NOT NULL,

    CONSTRAINT "RegionCountryOnContracts_pkey" PRIMARY KEY ("contractId","regionCountryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegionCountry_region_country_key" ON "RegionCountry"("region", "country");

-- AddForeignKey
ALTER TABLE "RegionCountryOnContracts" ADD CONSTRAINT "RegionCountryOnContracts_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionCountryOnContracts" ADD CONSTRAINT "RegionCountryOnContracts_regionCountryId_fkey" FOREIGN KEY ("regionCountryId") REFERENCES "RegionCountry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
