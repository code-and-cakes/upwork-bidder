import { SKILLS_DATA } from '../src/automation/consts/skills.consts';
import { prismaClient } from './prisma-client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function main() {
  if ((await prismaClient.skill.findMany()).length === 0) {
    console.log('Seeding skills...');
    await prismaClient.skill.createMany({ data: SKILLS_DATA });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });
