import { seedAccounts } from '../src/accounts/lib/seedAccounts';
import { seedCompanies } from '../src/companies/lib/seedCompanies';
import { seedPromptTemplates } from '../src/prompt-templates/lib/seedPromptTemplates';
import { seedQAs } from '../src/qa/lib/seedQAs';
import { seedSearchSuits } from '../src/search-suits/lib/seedSearchSuits';
import { seedSkills } from '../src/skills/lib/seedSkills';
import { prismaClient } from './prisma-client';

async function main() {
  await seedSkills();

  await seedCompanies();

  await seedAccounts();

  await seedPromptTemplates();

  await seedSearchSuits();

  await seedQAs();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });
