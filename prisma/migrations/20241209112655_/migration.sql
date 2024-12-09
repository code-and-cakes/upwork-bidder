/*
  Warnings:

  - You are about to alter the column `temperature` on the `PromptTemplate` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "PromptTemplate" ALTER COLUMN "temperature" SET DATA TYPE DOUBLE PRECISION;
