import { seedAccounts } from '../src/accounts/lib/seedAccounts';
import { SKILLS_DATA } from '../src/automation/consts/skills.consts';
import { seedCompanies } from '../src/companies/lib/seedCompanies';
import { prismaClient } from './prisma-client';

async function main() {
  if ((await prismaClient.skill.findMany()).length === 0) {
    console.log('Seeding skills...');
    await prismaClient.skill.createMany({ data: SKILLS_DATA });
  }

  await seedCompanies();

  await seedAccounts();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });
