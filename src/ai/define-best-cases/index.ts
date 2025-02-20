import { PromptTemplate } from '@prisma/client';

import { JobDetails } from '../../automation/types/job.types';
import { Case } from '../../cases/types/case.types';
import { parseTemplate } from '../../shared/lib/parseTemplate';
import { simpleListFormat } from '../../shared/lib/simpleListFormat';
import { formatJobInfo } from '../generate-cl/templates/formatJobInfo';
import { askAI } from '../lib/askAI';

interface DefineBestCasesContext {
  job: string;
  cases: string;
}

function formatTemplate(
  template: PromptTemplate,
  context: DefineBestCasesContext,
): string {
  return parseTemplate(template.value, context);
}

export async function defineBestCases(
  {
    cases,
    job,
    template,
  }: {
    cases: Case[];
    job: JobDetails;
    template: PromptTemplate;
  },
  names = false,
): Promise<string> {
  const jobInfo = formatJobInfo(job);

  if (template.type !== 'CASE_SELECTION') {
    throw new Error('Invalid template type');
  }

  const casesList = cases
    .map((i) => JSON.stringify(i.data, null, 2))
    .join('\n---\n');

  const prompt = formatTemplate(template, {
    job: jobInfo,
    cases: casesList,
  });

  const res = await askAI({
    user: prompt,
    model: template.model,
    temperature: template.temperature,
    json: true,
  });

  const caseNames = res?.cases;

  if (!caseNames) {
    throw new Error('No cases selected');
  }

  const bestCases = cases.filter((i) => caseNames.includes(i.name));

  if (names) {
    return bestCases.map((i) => i.name).join(', ');
  }

  return simpleListFormat(bestCases.map((i) => i.data));
}
