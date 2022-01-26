/*
  Warnings:

  - A unique constraint covering the columns `[purchaseId]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_purchaseId_key" ON "File"("purchaseId");
