/*
  Warnings:

  - A unique constraint covering the columns `[upworkId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "upworkId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Account_upworkId_key" ON "Account"("upworkId");
