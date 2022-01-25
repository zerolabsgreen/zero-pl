/*
  Warnings:

  - A unique constraint covering the columns `[purchaseId,fileType]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Made the column `purchaseId` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('ATTESTATION', 'REDEMPTION_STATEMENT');

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_purchaseId_fkey";

-- DropIndex
DROP INDEX "File_purchaseId_key";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "fileType" "FileType" NOT NULL DEFAULT E'ATTESTATION',
ALTER COLUMN "purchaseId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_purchaseId_fileType_key" ON "File"("purchaseId", "fileType");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
