/*
  Warnings:

  - The primary key for the `Batch` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_batchId_fkey";

-- AlterTable
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Batch_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Certificate" ALTER COLUMN "batchId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
