import { Injectable } from '@nestjs/common';
import { PromptType } from '@prisma/client';

import { AccountsService } from '../accounts/accounts.service';
import { JobDetails } from '../automation/types/job.types';
import { CasesService } from '../cases/cases.service';
import { CompaniesService } from '../companies/companies.service';
import { getJobDetailsFromJobInfo } from '../jobs/lib/getJobDetails';
import { PromptTemplatesService } from '../prompt-templates/prompt-templates.service';
import { answerQuestion } from './answer-question';
import { GenerateCoverLetterDto } from './dto/generate-cover-letter.dto';
import { GenerateQaDto } from './dto/generate-qa.dto';
import { generateCL } from './generate-cl';

@Injectable()
export class AIService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly casesService: CasesService,
    private readonly companyService: CompaniesService,
    private readonly ptService: PromptTemplatesService,
  ) {}

  async generateCoverLetter(d: GenerateCoverLetterDto) {
    const { accountId, companyId, jobInfo } = d;

    const account = await this.accountsService.findOne(accountId);
    const cases = await this.casesService.findMany({
      companyId,
    });
    const company = await this.companyService.findOne(companyId);
    const template = await this.ptService.findActive(companyId, 'COVER_LETTER');
    const casesTemplate = await this.ptService.findActive(
      companyId,
      'CASE_SELECTION',
    );

    const job: JobDetails = getJobDetailsFromJobInfo(jobInfo);

    return generateCL({
      cases,
      job,
      account,
      company,
      template,
      casesTemplate,
    });
  }

  async generateQA(d: GenerateQaDto) {
    const { question, companyId, jobInfo } = d;

    const company = await this.companyService.findOne(companyId);
    const job: JobDetails = getJobDetailsFromJobInfo(jobInfo);
    const template = await this.ptService.findActive(
      companyId,
      PromptType.ANSWER_QUESTION,
    );

    return answerQuestion({
      question,
      company,
      job,
      template,
    });
  }
}
