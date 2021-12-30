-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "confirmationToken" TEXT,
ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false;
