-- CreateTable
CREATE TABLE "QA" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Examples" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Examples_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QA_companyId_key" ON "QA"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Examples_companyId_key" ON "Examples"("companyId");

-- AddForeignKey
ALTER TABLE "QA" ADD CONSTRAINT "QA_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examples" ADD CONSTRAINT "Examples_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
