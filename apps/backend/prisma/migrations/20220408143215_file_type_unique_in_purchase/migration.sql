/*
  Warnings:

  - A unique constraint covering the columns `[purchaseId,fileType]` on the table `FilesOnPurchases` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FilesOnPurchases_purchaseId_fileType_key" ON "FilesOnPurchases"("purchaseId", "fileType");
