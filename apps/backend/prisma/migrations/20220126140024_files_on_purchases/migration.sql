/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `File` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "FilesOnPurchases" (
    "fileId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,

    CONSTRAINT "FilesOnPurchases_pkey" PRIMARY KEY ("fileId","purchaseId")
);

-- AddForeignKey
ALTER TABLE "FilesOnPurchases" ADD CONSTRAINT "FilesOnPurchases_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilesOnPurchases" ADD CONSTRAINT "FilesOnPurchases_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_purchaseId_fkey";

-- DropIndex
DROP INDEX "File_purchaseId_fileType_key";

DO $$
DECLARE
file_ids record;
BEGIN
FOR file_ids IN SELECT id, "purchaseId" FROM "File"
	LOOP
	INSERT INTO "FilesOnPurchases" ("fileId", "purchaseId") VALUES (file_ids.id, file_ids."purchaseId");
	END LOOP;
END$$;

-- AlterTable
ALTER TABLE "File" DROP COLUMN "purchaseId";
