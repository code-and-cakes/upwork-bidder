/*
  Warnings:

  - Made the column `approved` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "applied" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "approved" SET NOT NULL;
