import { PromptTemplate } from '@langchain/core/prompts';

export const defineBestCasesPrompt = PromptTemplate.fromTemplate(
  `Based on the following Upwork job information and the presented cases of completed projects from our IT company, choose one, or if applicable two, cases.
Take into account job industry, skills, and other info you see fit.
The output should be a json object of the following format: {{ "cases": ["caseName1", "caseName2"] }}

<job_proposal>
{jobInfo}
</job_proposal>

<company_info>
{casesList}
</company_info>

Answer:`,
);
