import { JobInfo } from '../../automation/types/job.types';
import { CompanyData } from '../../company/types/company.types';
import { askAI } from '../lib/askAI';
import { OpenAIModels } from '../models/open-ai';
import { getCompanyInfo } from './getCompanyInfo';
import { getJobInfo } from './getJobInfo';
import { generateCLPrompt } from './prompt';

interface Input {
  companyData: CompanyData;
  jobData: JobInfo;
}

export async function generateCL(dto: Input): Promise<string> {
  const companyInfo = getCompanyInfo(dto.companyData);
  const jobInfo = getJobInfo(dto.jobData);

  const prompt = await generateCLPrompt.format({ companyInfo, jobInfo });

  return askAI({
    system: prompt,
    model: OpenAIModels.GPT4Turbo,
    temperature: 0.7,
  });
}
