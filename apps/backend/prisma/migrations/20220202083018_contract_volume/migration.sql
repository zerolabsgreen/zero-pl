/*
  Warnings:

  - You are about to drop the column `deliveredVolume` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `openVolume` on the `Contract` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "deliveredVolume",
DROP COLUMN "openVolume",
ADD COLUMN     "volume" BIGINT NOT NULL DEFAULT 0;
