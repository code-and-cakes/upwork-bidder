/*
  Warnings:

  - You are about to drop the column `temperature` on the `PromptTemplate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PromptTemplate" DROP COLUMN "temperature";
