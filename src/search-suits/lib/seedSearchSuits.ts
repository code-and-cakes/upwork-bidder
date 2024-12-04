import { prismaClient } from '../../../prisma/prisma-client';
import { searchSuitMock } from '../mocks/search-suit.mock';

export async function seedSearchSuits() {
  if ((await prismaClient.searchSuit.findMany()).length) return;

  console.log('Seeding search suits...');

  const company = await prismaClient.company.findFirst();

  await prismaClient.searchSuit.create({
    data: {
      ...searchSuitMock,
      companyId: company.id,
    } as any,
  });
}
