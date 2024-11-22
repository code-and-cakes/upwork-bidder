import { JobInfo } from '../../automation/types/job.types';
import { Case } from '../../cases/types/case.types';
import { formatJobInfo } from '../generate-cl/templates/formatJobInfo';
import { askAI } from '../lib/askAI';
import { OpenAIModels } from '../models/open-ai';
import { defineBestCasesPrompt } from './prompt';

export async function defineBestCases({
  cases,
  jobData,
}: {
  cases: Case[];
  jobData: JobInfo;
}): Promise<string> {
  const jobInfo = formatJobInfo({
    description: jobData.description,
    skills: jobData.skills,
    title: jobData.title,
  } as JobInfo);

  const casesList = cases
    .map((i) => JSON.stringify(i.data, null, 2))
    .join('\n---\n');

  const prompt = await defineBestCasesPrompt.format({
    jobInfo,
    casesList,
  });

  const res = await askAI({
    system: prompt,
    model: OpenAIModels.GPT4oMini,
    temperature: 0.2,
    json: true,
  });

  const caseNames = res?.cases;

  if (!caseNames) {
    throw new Error('No cases selected');
  }

  const bestCases = cases.filter((i) => caseNames.includes(i.name));

  return bestCases.map((i) => i.data).join('\n---\n');
}
