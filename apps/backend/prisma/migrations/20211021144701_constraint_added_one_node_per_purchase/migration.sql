/*
  Warnings:

  - A unique constraint covering the columns `[purchaseId,filecoinNodeId]` on the table `FilecoinNodesOnPurchases` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FilecoinNodesOnPurchases.purchaseId_filecoinNodeId_unique" ON "FilecoinNodesOnPurchases"("purchaseId", "filecoinNodeId");
