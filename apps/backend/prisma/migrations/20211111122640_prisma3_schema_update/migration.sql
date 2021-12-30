-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_initialSellerId_fkey";

-- DropForeignKey
ALTER TABLE "FilecoinNode" DROP CONSTRAINT "FilecoinNode_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "FilecoinNodesOnPurchases" DROP CONSTRAINT "FilecoinNodesOnPurchases_filecoinNodeId_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "FilecoinNodesOnPurchases" DROP CONSTRAINT "FilecoinNodesOnPurchases_purchaseId_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_certificateId_fkey";

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_initialSellerId_fkey" FOREIGN KEY ("initialSellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilecoinNode" ADD CONSTRAINT "FilecoinNode_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilecoinNodesOnPurchases" ADD CONSTRAINT "FilecoinNodesOnPurchases_purchaseId_buyerId_fkey" FOREIGN KEY ("purchaseId", "buyerId") REFERENCES "Purchase"("id", "buyerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilecoinNodesOnPurchases" ADD CONSTRAINT "FilecoinNodesOnPurchases_filecoinNodeId_buyerId_fkey" FOREIGN KEY ("filecoinNodeId", "buyerId") REFERENCES "FilecoinNode"("id", "buyerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Buyer.blockchainAddress_unique" RENAME TO "Buyer_blockchainAddress_key";

-- RenameIndex
ALTER INDEX "File.createdAt_index" RENAME TO "File_createdAt_idx";

-- RenameIndex
ALTER INDEX "FilecoinNode.id_buyerId_unique" RENAME TO "FilecoinNode_id_buyerId_key";

-- RenameIndex
ALTER INDEX "FilecoinNodesOnPurchases.purchaseId_filecoinNodeId_unique" RENAME TO "FilecoinNodesOnPurchases_purchaseId_filecoinNodeId_key";

-- RenameIndex
ALTER INDEX "OrderItem.orderId_minerId_unique" RENAME TO "OrderItem_orderId_minerId_key";

-- RenameIndex
ALTER INDEX "Purchase.id_buyerId_unique" RENAME TO "Purchase_id_buyerId_key";

-- RenameIndex
ALTER INDEX "Seller.blockchainAddress_unique" RENAME TO "Seller_blockchainAddress_key";
