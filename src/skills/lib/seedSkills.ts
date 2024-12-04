import { prismaClient } from '../../../prisma/prisma-client';
import { SKILLS_DATA } from '../consts/skills.consts';

export async function seedSkills() {
  if ((await prismaClient.skill.findMany()).length) return;

  console.log('Seeding skills...');
  await prismaClient.skill.createMany({ data: SKILLS_DATA });
}
