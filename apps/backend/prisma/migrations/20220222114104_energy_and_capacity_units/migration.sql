-- AlterTable
ALTER TABLE "Certificate" RENAME COLUMN "energy" TO "energyWh";
ALTER TABLE "Certificate" RENAME COLUMN "capacity" TO "nameplateCapacityW";

-- AlterTable
ALTER TABLE "OrderItemTimeFrame" RENAME COLUMN "energy" TO "energyWh";
