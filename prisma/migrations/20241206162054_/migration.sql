-- CreateEnum
CREATE TYPE "PromptType" AS ENUM ('COVER_LETTER', 'ACCOUNT_SELECTION', 'CASE_SELECTION');

-- AlterTable
ALTER TABLE "PromptTemplate" ADD COLUMN     "type" "PromptType" NOT NULL DEFAULT 'COVER_LETTER';
