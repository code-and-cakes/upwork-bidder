import { prismaClient } from '../../../prisma/prisma-client';
import { ACCOUNTS } from '../consts/accounts.const';

export async function seedAccounts() {
  if ((await prismaClient.account.findMany()).length === 0) {
    console.log('Seeding accounts...');

    const skills = await prismaClient.skill.findMany();

    const skillsNameDataMap: Record<string, Id> = skills.reduce(
      (acc, skill) => {
        acc[skill.name] = skill.id;
        return acc;
      },
      {},
    );

    for await (const account of ACCOUNTS) {
      const skills = account.skills.map((skillName) => ({
        id: skillsNameDataMap[skillName],
      }));

      const company = await prismaClient.company.findFirst();

      await prismaClient.account.create({
        data: {
          ...account,
          skills: { connect: skills },
          companyId: company.id,
        },
      });
    }
  }
}
