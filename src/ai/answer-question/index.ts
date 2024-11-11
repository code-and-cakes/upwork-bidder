import { JobInfo } from '../../automation/types/job.types';
import { CompanyData } from '../../company/types/company.types';
import { getCompanyInfo } from '../generate-cl/getCompanyInfo';
import { getJobInfo } from '../generate-cl/getJobInfo';
import { askAI } from '../lib/askAI';
import { OpenAIModels } from '../models/open-ai';
import { answerQuestionPrompt } from './prompt';

interface Input {
  companyData: CompanyData;
  jobData: JobInfo;
  question: string;
}

export async function answerQuestion(dto: Input): Promise<string> {
  const companyInfo = getCompanyInfo(dto.companyData);
  const jobInfo = getJobInfo(dto.jobData);

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
