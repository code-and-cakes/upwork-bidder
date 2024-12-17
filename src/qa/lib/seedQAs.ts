import { prismaClient } from '../../../prisma/prisma-client';
import { getDefaultQuestions } from './getDefaultQuestions';

export async function seedQAs() {
  if ((await prismaClient.qA.findMany()).length === 0) {
    console.log('Seeding QAs...');

    const companies = await prismaClient.company.findMany();

    for await (const company of companies) {
      await prismaClient.qA.create({
        data: {
          data: getDefaultQuestions(),
          companyId: company.id,
        },
      });
    }
  }
}
