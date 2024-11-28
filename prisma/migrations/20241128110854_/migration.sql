/*
  Warnings:

  - You are about to drop the `CompanyData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CompanyDataToSkill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_companyId_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyDataToSkill" DROP CONSTRAINT "_CompanyDataToSkill_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyDataToSkill" DROP CONSTRAINT "_CompanyDataToSkill_B_fkey";

-- DropTable
DROP TABLE "CompanyData";

-- DropTable
DROP TABLE "_CompanyDataToSkill";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "moto" TEXT,
    "overview" TEXT NOT NULL,
    "services" JSONB NOT NULL,
    "website" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CompanyToSkill" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToSkill_AB_unique" ON "_CompanyToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToSkill_B_index" ON "_CompanyToSkill"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToSkill" ADD CONSTRAINT "_CompanyToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToSkill" ADD CONSTRAINT "_CompanyToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
