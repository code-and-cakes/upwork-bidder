import { prismaClient } from '../../../prisma/prisma-client';
import { CC_COMPANY_DATA } from '../../companies/consts/cc-company-data.consts';
import { CC_PROMPT_TEMPLATE_V1 } from '../consts/cc-pts.consts';

export async function seedPromptTemplates() {
  if ((await prismaClient.promptTemplate.findMany()).length) return;

  console.log('Seeding prompt templates...');

  const company = await prismaClient.company.findUniqueOrThrow({
    where: {
      name: CC_COMPANY_DATA.name,
    },
  });

  await prismaClient.promptTemplate.create({
    data: { ...CC_PROMPT_TEMPLATE_V1, companyId: company.id },
  });
}
