/*
  Warnings:

  - You are about to drop the `FilecoinNodesOnPurchases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FilecoinNodesOnPurchases" DROP CONSTRAINT "FilecoinNodesOnPurchases_filecoinNodeId_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "FilecoinNodesOnPurchases" DROP CONSTRAINT "FilecoinNodesOnPurchases_purchaseId_buyerId_fkey";

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "filecoinNodeId" TEXT;

-- DropTable
DROP TABLE "FilecoinNodesOnPurchases";

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_filecoinNodeId_fkey" FOREIGN KEY ("filecoinNodeId") REFERENCES "FilecoinNode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
