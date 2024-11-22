import { Account } from '@prisma/client';

import { JobInfo } from '../../automation/types/job.types';
import { Case } from '../../cases/types/case.types';
import { CompanyData } from '../../company/types/company.types';
import { defineBestCases } from '../define-best-cases';
import { askAI } from '../lib/askAI';
import { OpenAIModels } from '../models/open-ai';
import { clExamples } from './consts/clExamples';
import { generateCLPrompt } from './prompt';
import { formatApplicantInfo } from './templates/formatAccount';
import { formatJobInfo } from './templates/formatJobInfo';
import { getCompanyInfo } from './templates/getCompanyInfo';

interface Input {
  companyData: CompanyData;
  jobData: JobInfo;
  accountData: Account;
  cases: Case[];
}

export async function generateCL(d: Input): Promise<string> {
  const companyInfo = getCompanyInfo(d.companyData);
  const jobInfo = formatJobInfo(d.jobData);
  const cases = await defineBestCases({ cases: d.cases, jobData: d.jobData });
  const examples = clExamples;
  const applicantInfo = formatApplicantInfo(d.accountData);

  const prompt = await generateCLPrompt.format({
    cases,
    jobInfo,
    examples,
    companyInfo,
    applicantInfo,
  });

  return askAI({
    system: prompt,
    temperature: 0.7,
    model: OpenAIModels.GPT4Turbo,
  });
}
