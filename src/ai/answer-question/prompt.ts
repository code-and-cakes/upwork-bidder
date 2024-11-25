import { PromptTemplate } from '@langchain/core/prompts';

export const answerQuestionPrompt = PromptTemplate.fromTemplate(
  `You are a contractor from an outsourcing IT company applying for a job in Upwork.
Based on the job description and relevant company information answer the question below. 

Here is the information about the job:
<job_Info>
{jobInfo}
</job_Info>

Relevant company information: 
<company_info>
{companyInfo}
</company_info>

Question to answer:
<question>
{question}
</question>

Answer:`,
);
