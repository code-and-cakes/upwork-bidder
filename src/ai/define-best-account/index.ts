import { Account } from '@prisma/client';

import { JobInfo } from '../../automation/types/job.types';
import { Job } from '../../jobs/types/job.types';
import { getJobInfo } from '../generate-cl/getJobInfo';
import { askAI } from '../lib/askAI';
import { OpenAIModels } from '../models/open-ai';
import { formatAccount } from './formatAccounts';
import { defineBestAccountPrompt } from './prompt';

export async function defineBestAccount(dto: {
  accounts: Account[];
  jobData: Job;
}): Promise<Id> {
  const jobInfo = getJobInfo({
    description: dto.jobData.data.description,
    skills: dto.jobData.data.skills,
    title: dto.jobData.title,
  } as JobInfo);

  const accounts = dto.accounts.map(formatAccount).join('\n');

  const prompt = await defineBestAccountPrompt.format({
    jobInfo,
    accounts,
  });

  const res = await askAI({
    system: prompt,
    model: OpenAIModels.GPT4oMini,
    temperature: 0.7,
    json: true,
  });

  return res?.id || null;
}
