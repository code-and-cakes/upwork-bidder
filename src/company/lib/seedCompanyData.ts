import { prismaClient } from '../../../prisma/prisma-client';
import { CC_COMPANY_DATA } from '../consts/cc-company-data.consts';

export async function seedCompanyData() {
  if ((await prismaClient.companyData.findMany()).length) return;

  console.log('Seeding company data...');

  await prismaClient.companyData.create({
    data: CC_COMPANY_DATA as any,
  });
}
