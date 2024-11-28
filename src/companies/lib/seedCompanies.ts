import { prismaClient } from '../../../prisma/prisma-client';
import { CC_COMPANY_DATA } from '../consts/cc-company-data.consts';

export async function seedCompanies() {
  if ((await prismaClient.company.findMany()).length) return;

  console.log('Seeding companies...');

  await prismaClient.company.create({
    data: CC_COMPANY_DATA as any,
  });
}
