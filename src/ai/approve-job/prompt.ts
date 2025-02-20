import { PromptTemplate } from '@langchain/core/prompts';

export const defineBestAccountPrompt = PromptTemplate.fromTemplate(
  `Based on the following job information and the given accounts information, choose the best account for the job proposal.
Your answer should be the ID of the account you choose in the JSON format {{ id: AccountId }} and nothing more".

<job_proposal>
{jobInfo}
</job_proposal>

Available accounts: 
<accounts>
{accounts}
</accounts>

Answer:`,
);
