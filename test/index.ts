import { prismaClient } from '../prisma/prisma-client';
import { defineBestCases } from '../src/ai/define-best-cases';

async function test() {
  const cases = (await prismaClient.case.findMany()) as any;
  const jobData = (await prismaClient.job.findFirst()) as any;

  const res = await defineBestCases({ cases, jobData });
  console.log(res);
}

test();
