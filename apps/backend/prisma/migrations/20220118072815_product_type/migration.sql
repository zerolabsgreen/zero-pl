/*
  Warnings:

  - The `energySource` column on the `Certificate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProductEnumType" AS ENUM ('REC', 'IREC', 'GO', 'TIGR');

-- CreateEnum
CREATE TYPE "EnergySourceEnumType" AS ENUM ('SOLAR', 'WIND', 'HYDRO', 'MARINE', 'THERMAL', 'BIOMASS', 'BIOGAS');

-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "productType" "ProductEnumType" NOT NULL DEFAULT E'IREC',
DROP COLUMN "energySource",
ADD COLUMN     "energySource" "EnergySourceEnumType" NOT NULL DEFAULT E'SOLAR';
