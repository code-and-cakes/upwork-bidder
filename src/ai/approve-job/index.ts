import { PromptTemplate } from '@prisma/client';

import { JobDetails } from '../../automation/types/job.types';
import { Company } from '../../companies/types/company-data';
import { parseTemplate } from '../../shared/lib/parseTemplate';
import { formatJobInfo } from '../generate-cl/templates/formatJobInfo';
import { getCompanyInfo } from '../generate-cl/templates/getCompanyInfo';
import { askAI } from '../lib/askAI';

interface Input {
  company: Company;
  job: JobDetails;
  template: PromptTemplate;
}

interface ApproveJobContext {
  job: string;
  company: string;
}

function formatTemplate(
  template: PromptTemplate,
  context: ApproveJobContext,
): string {
  return parseTemplate(template.value, context);
}

export async function approveJob(d: Input): Promise<boolean> {
  if (d.template.type !== 'APPROVE_JOB') {
    throw new Error('Invalid template type');
  }

  const company = getCompanyInfo(d.company);
  const job = formatJobInfo(d.job);

  const prompt = formatTemplate(d.template, {
    job,
    company,
  });

  const { result } = await askAI({
    user: prompt,
    model: d.template.model,
    temperature: d.template.temperature,
    json: true,
  });

  return result;
}
