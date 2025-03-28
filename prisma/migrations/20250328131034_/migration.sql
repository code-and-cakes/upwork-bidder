/*
  Warnings:

  - You are about to drop the column `lastNotifiedConnections` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "lastNotifiedConnections";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "lastNotifiedConnections" TIMESTAMP(3);
