import { Account } from '@prisma/client';

import { JobInfo } from '../../automation/types/job.types';
import { Job } from '../../jobs/types/job.types';
import { simpleListFormat } from '../../shared/lib/simpleListFormat';
import { formatJobInfo } from '../generate-cl/templates/formatJobInfo';
import { askAI } from '../lib/askAI';
import { OpenAIModels } from '../models/open-ai';
import { formatAccount } from './formatAccounts';
import { defineBestAccountPrompt } from './prompt';

export async function defineBestAccount(d: {
  accounts: Account[];
  jobData: Job;
}): Promise<Id> {
  const jobInfo = formatJobInfo({
    description: d.jobData.data.description,
    skills: d.jobData.data.skills,
    title: d.jobData.title,
  } as JobInfo);

  const accounts = simpleListFormat(d.accounts, formatAccount);

  const prompt = await defineBestAccountPrompt.format({
    jobInfo,
    accounts,
  });

  console.log('Prompt:', prompt);

  const res = await askAI({
    system: prompt,
    model: OpenAIModels.GPT4oMini,
    temperature: 0.7,
    json: true,
  });

  console.log('Response:', res);

  return res?.id || null;
}
