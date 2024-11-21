import { JobInfo } from '../../automation/types/job.types';
import { Case } from '../../cases/types/case.types';
import { Job } from '../../jobs/types/job.types';
import { getJobInfo } from '../generate-cl/getJobInfo';
import { askAI } from '../lib/askAI';
import { OpenAIModels } from '../models/open-ai';
import { defineBestCasesPrompt } from './prompt';

export async function defineBestCases({
  cases,
  jobData,
}: {
  cases: Case[];
  jobData: Job;
}): Promise<Case[]> {
  const jobInfo = getJobInfo({
    description: jobData.data.description,
    skills: jobData.data.skills,
    title: jobData.title,
  } as JobInfo);

  const casesList = cases
    .map((i) => JSON.stringify(i.data, null, 2))
    .join('\n---\n');

  const prompt = await defineBestCasesPrompt.format({
    jobInfo,
    casesList,
  });

  console.log(prompt);

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

  return cases.filter((i) => caseNames.includes(i.name));
}
