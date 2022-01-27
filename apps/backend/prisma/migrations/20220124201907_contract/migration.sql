-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "contractId" TEXT;

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "filecoinNodeId" TEXT,
    "productType" "ProductEnumType" NOT NULL,
    "energySources" "EnergySourceEnumType"[],
    "region" TEXT,
    "country" "CountryEnumType" NOT NULL,
    "generationStart" TIMESTAMP(3) NOT NULL,
    "generationEnd" TIMESTAMP(3) NOT NULL,
    "timezoneOffset" INTEGER NOT NULL,
    "openVolume" BIGINT NOT NULL,
    "deliveredVolume" BIGINT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_filecoinNodeId_fkey" FOREIGN KEY ("filecoinNodeId") REFERENCES "FilecoinNode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
