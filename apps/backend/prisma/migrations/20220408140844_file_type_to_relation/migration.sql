ALTER TABLE "FilesOnPurchases" DROP CONSTRAINT "FilesOnPurchases_pkey";
ALTER TABLE "FilesOnPurchases" ADD COLUMN "fileType" "FileType";
UPDATE "FilesOnPurchases" AS fp SET "fileType" = f."fileType" FROM "File" AS f WHERE fp."fileId" = f.id;

ALTER TABLE "FilesOnPurchases" ALTER COLUMN "fileType" SET NOT NULL;
ALTER TABLE "FilesOnPurchases" ADD CONSTRAINT "FilesOnPurchases_pkey" PRIMARY KEY ("fileId", "purchaseId", "fileType");

ALTER TABLE "File" DROP COLUMN "fileType";
