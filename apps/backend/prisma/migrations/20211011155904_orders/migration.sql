-- CreateEnum
CREATE TYPE "PaymentPreferencesEnumType" AS ENUM ('WIRE_TRANSFER', 'CRYPTO');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "paymentPreferences" "PaymentPreferencesEnumType"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "minerId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItemTimeFrame" (
    "id" TEXT NOT NULL,
    "orderItemId" TEXT,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "energy" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem.orderId_minerId_unique" ON "OrderItem"("orderId", "minerId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemTimeFrame" ADD FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
