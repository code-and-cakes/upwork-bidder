import { Injectable } from '@nestjs/common';

import { AccountsService } from '../accounts/accounts.service';
import { JobDetails } from '../automation/types/job.types';
import { CasesService } from '../cases/cases.service';
import { CompaniesService } from '../companies/companies.service';
import { PrismaService } from '../global';
import { getJobDetailsFromJobInfo } from '../jobs/lib/getJobDetails';
import { PromptTemplatesService } from '../prompt-templates/prompt-templates.service';
import { GenerateCoverLetterDto } from './dto/generate-cover-letter.dto';
import { generateCL } from './generate-cl';

@Injectable()
export class AIService {
  constructor(
    private db: PrismaService,
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

    console.log(jobInfo);

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
}
