/*
  Warnings:

  - The values [JOB_SELECTION,QUESTIONS_ANSWERS] on the enum `PromptType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "OpenAIModel" AS ENUM ('GPT35_TURBO', 'GPT4_TURBO', 'GPT4O', 'GPT4O_MINI', 'O1', 'O1_MINI');

-- AlterEnum
BEGIN;
CREATE TYPE "PromptType_new" AS ENUM ('COVER_LETTER', 'ACCOUNT_SELECTION', 'CASE_SELECTION', 'APPROVE_JOB', 'ANSWER_QUESTION');
ALTER TABLE "PromptTemplate" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "PromptTemplate" ALTER COLUMN "type" TYPE "PromptType_new" USING ("type"::text::"PromptType_new");
ALTER TYPE "PromptType" RENAME TO "PromptType_old";
ALTER TYPE "PromptType_new" RENAME TO "PromptType";
DROP TYPE "PromptType_old";
ALTER TABLE "PromptTemplate" ALTER COLUMN "type" SET DEFAULT 'COVER_LETTER';
COMMIT;

-- AlterTable
ALTER TABLE "PromptTemplate" ADD COLUMN     "model" "OpenAIModel" NOT NULL DEFAULT 'GPT4_TURBO',
ADD COLUMN     "temperature" DOUBLE PRECISION NOT NULL DEFAULT 0.7;
