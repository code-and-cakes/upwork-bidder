-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "answered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "viewed" BOOLEAN NOT NULL DEFAULT false;
