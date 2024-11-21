/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "githubId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyData" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "moto" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "services" JSONB NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "CompanyData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountToSkill" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CompanyDataToSkill" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_githubId_key" ON "Account"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyData_name_key" ON "CompanyData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Case_name_key" ON "Case"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToSkill_AB_unique" ON "_AccountToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToSkill_B_index" ON "_AccountToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyDataToSkill_AB_unique" ON "_CompanyDataToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyDataToSkill_B_index" ON "_CompanyDataToSkill"("B");

-- AddForeignKey
ALTER TABLE "_AccountToSkill" ADD CONSTRAINT "_AccountToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToSkill" ADD CONSTRAINT "_AccountToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyDataToSkill" ADD CONSTRAINT "_CompanyDataToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "CompanyData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyDataToSkill" ADD CONSTRAINT "_CompanyDataToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
