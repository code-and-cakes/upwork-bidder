-- AlterTable
ALTER TABLE "PromptTemplate" ADD COLUMN     "temperature" DECIMAL(65,30) NOT NULL DEFAULT 0.7;
