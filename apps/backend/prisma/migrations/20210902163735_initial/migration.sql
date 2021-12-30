-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" BYTEA NOT NULL,
    "purchaseId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buyer" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "contactPerson" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "generatorName" TEXT,
    "generatorId" TEXT,
    "country" TEXT NOT NULL,
    "energySource" TEXT NOT NULL,
    "generationStart" TIMESTAMP(3),
    "generationEnd" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilecoinNode" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "certificateId" TEXT NOT NULL,
    "buyerId" TEXT,
    "sellerId" TEXT,
    "recsSold" INTEGER NOT NULL,
    "recsTransactions" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilecoinNodesOnPurchases" (
    "purchaseId" TEXT NOT NULL,
    "filecoinNodeId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,

    PRIMARY KEY ("purchaseId","filecoinNodeId","buyerId")
);

-- CreateIndex
CREATE INDEX "File.createdAt_index" ON "File"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "FilecoinNode.id_buyerId_unique" ON "FilecoinNode"("id", "buyerId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase.id_buyerId_unique" ON "Purchase"("id", "buyerId");

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilecoinNode" ADD FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilecoinNodesOnPurchases" ADD FOREIGN KEY ("purchaseId", "buyerId") REFERENCES "Purchase"("id", "buyerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilecoinNodesOnPurchases" ADD FOREIGN KEY ("filecoinNodeId", "buyerId") REFERENCES "FilecoinNode"("id", "buyerId") ON DELETE CASCADE ON UPDATE CASCADE;
