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
  question: string;
  template: PromptTemplate;
}

interface AnswerQuestionContext {
  company: string;
  job: string;
  question: string;
}

function formatTemplate(
  template: PromptTemplate,
  context: AnswerQuestionContext,
): string {
  return parseTemplate(template.value, context);
}

export async function answerQuestion(d: Input): Promise<string> {
  if (d.template.type !== 'ANSWER_QUESTION') {
    throw new Error('Invalid template type');
  }

  const company = getCompanyInfo(d.company);
  const job = formatJobInfo(d.job);

  const prompt = formatTemplate(d.template, {
    company,
    job,
    question: d.question,
  });

  return askAI({
    system: prompt,
    model: d.template.model,
    temperature: d.template.temperature,
  });
}
