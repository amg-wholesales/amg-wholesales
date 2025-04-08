/*
  Warnings:

  - You are about to drop the `Buyer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Buyer" DROP CONSTRAINT "Buyer_userId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "retailPrice" DECIMAL(65,30) DEFAULT 15;

-- DropTable
DROP TABLE "Buyer";

-- CreateTable
CREATE TABLE "WholesaleBuyer" (
    "userId" TEXT NOT NULL,
    "taxId" TEXT,
    "taxIdFile" TEXT,
    "storeName" TEXT,
    "companyName" TEXT,
    "contactPerson" TEXT,
    "officePhone" TEXT,
    "cellPhone" TEXT,
    "addressLine1" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "notes" TEXT,

    CONSTRAINT "WholesaleBuyer_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "RetailBuyer" (
    "userId" TEXT NOT NULL,
    "contactPerson" TEXT,
    "cellPhone" TEXT,
    "addressLine1" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "notes" TEXT,

    CONSTRAINT "RetailBuyer_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "WholesaleBuyer_userId_key" ON "WholesaleBuyer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RetailBuyer_userId_key" ON "RetailBuyer"("userId");

-- AddForeignKey
ALTER TABLE "WholesaleBuyer" ADD CONSTRAINT "WholesaleBuyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailBuyer" ADD CONSTRAINT "RetailBuyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
