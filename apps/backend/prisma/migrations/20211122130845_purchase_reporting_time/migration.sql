-- AlterTable
ALTER TABLE "Purchase"
ADD COLUMN     "reportingStart" TIMESTAMP(3),
ADD COLUMN     "reportingStartTimezoneOffset" INTEGER,
ADD COLUMN     "reportingEnd" TIMESTAMP(3),
ADD COLUMN     "reportingEndTimezoneOffset" INTEGER;
