import { PromptTemplate } from '@langchain/core/prompts';

export const generateCLPrompt = PromptTemplate.fromTemplate(
  `You are a contractor from an outsourcing IT company applying for a job in Upwork.
Based on the job description and relevant company information generate a cover letter for the application. 

Here is the information about the job:
<jobInfo>
{jobInfo}
</jobInfo>

Relevant company information: 
<companyInfo>
{companyInfo}
</companyInfo>

Answer:`,
);
