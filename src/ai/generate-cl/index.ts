import { Account, Company, PromptTemplate } from '@prisma/client';

import { JobInfo } from '../../automation/types/job.types';
import { Case } from '../../cases/types/case.types';
import { parseTemplate } from '../../shared/lib/parseTemplate';
import { writeToFile } from '../../shared/lib/write-to-file';
import { defineBestCases } from '../define-best-cases';
import { askAI } from '../lib/askAI';
import { OpenAIModels } from '../models/open-ai';
import { clExamples } from './consts/clExamples';
import { formatApplicantInfo } from './templates/formatAccount';
import { formatJobInfo } from './templates/formatJobInfo';
import { getCompanyInfo } from './templates/getCompanyInfo';

interface Input {
  companyData: Company;
  jobData: JobInfo;
  accountData: Account;
  cases: Case[];
  template: PromptTemplate;
}

interface CoverLetterContext {
  company: string;
  job: string;
  cases: string;
  examples: string;
  applicant: string;
}

function formatTemplate(
  template: PromptTemplate,
  context: CoverLetterContext,
): string {
  return parseTemplate(template.value, context);
}

export async function generateCL(d: Input): Promise<string> {
  const company = getCompanyInfo(d.companyData);
  const job = formatJobInfo(d.jobData);
  const cases = await defineBestCases({ cases: d.cases, jobData: d.jobData });
  const examples = clExamples;
  const applicant = formatApplicantInfo(d.accountData);

  const prompt = formatTemplate(d.template, {
    company,
    job,
    cases,
    examples,
    applicant,
  });

  writeToFile(prompt, 'cl-prompt.txt');

  const res = await askAI({
    user: prompt,
    // temperature: 0.7,
    model: OpenAIModels.o1,
  });

  writeToFile(res, 'cl-response.txt');

  return res;
}
