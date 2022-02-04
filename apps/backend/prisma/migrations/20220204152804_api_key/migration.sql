-- CreateEnum
CREATE TYPE "ApiKeyPermissions" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE', 'ADMIN');

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "permissions" "ApiKeyPermissions"[],

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);
