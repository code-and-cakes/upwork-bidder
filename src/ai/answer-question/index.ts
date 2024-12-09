import { JobInfo } from '../../automation/types/job.types';
import { Company } from '../../companies/types/company-data';
import { getJobDetailsFromJobInfo } from '../../jobs/lib/getJobDetails';
import { formatJobInfo } from '../generate-cl/templates/formatJobInfo';
import { getCompanyInfo } from '../generate-cl/templates/getCompanyInfo';
import { askAI } from '../lib/askAI';
import { OpenAIModels } from '../models/open-ai';
import { answerQuestionPrompt } from './prompt';

interface Input {
  companyData: Company;
  jobData: JobInfo;
  question: string;
}

export async function answerQuestion(dto: Input): Promise<string> {
  const companyInfo = getCompanyInfo(dto.companyData);
  const jobInfo = formatJobInfo(getJobDetailsFromJobInfo(dto.jobData));

  const prompt = await answerQuestionPrompt.format({
    companyInfo,
    jobInfo,
    question: dto.question,
  });

  return askAI({
    system: prompt,
    model: OpenAIModels.GPT4Turbo,
    temperature: 0.7,
  });
}
