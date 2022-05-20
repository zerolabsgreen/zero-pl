-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "batchId" BIGINT;

-- CreateTable
CREATE TABLE "Batch" (
    "id" BIGINT NOT NULL,
    "redemptionStatementId" TEXT,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Batch_redemptionStatementId_key" ON "Batch"("redemptionStatementId");

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
