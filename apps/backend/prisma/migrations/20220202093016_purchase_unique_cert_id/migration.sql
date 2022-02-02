/*
  Warnings:

  - A unique constraint covering the columns `[certificateId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Purchase_certificateId_key" ON "Purchase"("certificateId");
