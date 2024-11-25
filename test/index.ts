import { prismaClient } from '../prisma/prisma-client';
import { generateCL } from '../src/ai/generate-cl';
import { jobInfoMock } from '../src/jobs/mocks/jobInfo.mock';

async function test() {
  const cases = (await prismaClient.case.findMany()) as any;
  const jobData = jobInfoMock;
  const companyData = await prismaClient.companyData.findFirst();
  const accountData = await prismaClient.account.findUnique({
    where: { id: '12b73e42-6953-4498-b4cc-017d307b32c3' },
  });

  const res = await generateCL({ cases, jobData, companyData, accountData });
  console.log(res);
}

test();
