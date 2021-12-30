/*
  Warnings:

  - Added the required column `protocolType` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProtocolTypeEnumType" AS ENUM ('FILECOIN', 'BITCOIN');

-- CreateEnum
CREATE TYPE "UserTypeEnumType" AS ENUM ('MINER', 'STORAGE_PROVIDER', 'APP_DEVELOPER', 'CRYPTO_USER', 'OTHER');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "protocolType" "ProtocolTypeEnumType" NOT NULL,
ADD COLUMN     "userType" "UserTypeEnumType" NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "city" TEXT;
