import { Account, PromptTemplate } from '@prisma/client';

import { getJobDetailsFromJob } from '../../jobs/lib/getJobDetails';
import { Job } from '../../jobs/types/job.types';
import { parseTemplate } from '../../shared/lib/parseTemplate';
import { simpleListFormat } from '../../shared/lib/simpleListFormat';
import { formatJobInfo } from '../generate-cl/templates/formatJobInfo';
import { askAI } from '../lib/askAI';
import { OpenAIModels } from '../models/open-ai';
import { formatAccount } from './formatAccounts';

interface DefineBestAccountContext {
  job: string;
  accounts: string;
}

function formatTemplate(
  template: PromptTemplate,
  context: DefineBestAccountContext,
): string {
  return parseTemplate(template.value, context);
}

export async function defineBestAccount(d: {
  accounts: Account[];
  job: Job;
  template: PromptTemplate;
}): Promise<Id> {
  if (d.template.type !== 'ACCOUNT_SELECTION') {
    throw new Error('Invalid template type');
  }

  const job = formatJobInfo(getJobDetailsFromJob(d.job));

  const accounts = simpleListFormat(d.accounts, formatAccount);

  const prompt = formatTemplate(d.template, {
    job,
    accounts,
  });

  const res = await askAI({
    user: prompt,
    model: OpenAIModels.o1,
    temperature: 1,
    json: true,
  });

  return res?.id || null;
}
