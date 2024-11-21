/*
  Warnings:

  - Added the required column `duration` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industry` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `market` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "industry" TEXT NOT NULL,
ADD COLUMN     "market" TEXT NOT NULL;
