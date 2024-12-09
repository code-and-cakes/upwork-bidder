import { Injectable } from '@nestjs/common';

import { AccountsService } from '../accounts/accounts.service';
import { defineBestAccount } from '../ai/define-best-account';
import { defineBestCases } from '../ai/define-best-cases';
import { generateCL } from '../ai/generate-cl';
import { CasesService } from '../cases/cases.service';
import { CompaniesService } from '../companies/companies.service';
import { PrismaService } from '../global';
import { JobsService } from '../jobs/jobs.service';
import { PromptTemplatesService } from '../prompt-templates/prompt-templates.service';
import { DefineBestCasesDto } from './dto/define-best-cases.dto';
import { GenerateClDto } from './dto/generate-cl.dto';

@Injectable()
export class SandboxService {
  constructor(
    private readonly db: PrismaService,
    private readonly jobsService: JobsService,

    private readonly accountsService: AccountsService,
    private readonly casesService: CasesService,
    private readonly companyService: CompaniesService,
    private readonly ptService: PromptTemplatesService,
  ) {}

  async generateCL(d: GenerateClDto) {
    const { accountId, companyId, templateId, jobId } = d;

    const job = await this.jobsService.getDetails(jobId);

    const account = await this.accountsService.findOne(accountId);
    const cases = await this.casesService.findAll();
    const company = await this.companyService.findOne(companyId);
    const template = await this.ptService.findOne(templateId);
    const casesTemplate = await this.ptService.findActive(
      companyId,
      'CASE_SELECTION',
    );

    return generateCL({
      cases,
      job,
      account,
      company,
      template,
      casesTemplate,
    });
  }

  async defineBestCases(d: DefineBestCasesDto) {
    const { companyId, templateId, jobId } = d;

    const job = await this.jobsService.getDetails(jobId);
    const cases = await this.casesService.findMany({ companyId });
    const template = await this.ptService.findOne(templateId);

    return defineBestCases({
      cases,
      job,
      template,
    });
  }

  async defineBestAccount(d: DefineBestCasesDto) {
    const { companyId, templateId, jobId } = d;

    const job = await this.jobsService.findOne(jobId);
    const accounts = await this.accountsService.findAll(companyId);
    const template = await this.ptService.findOne(templateId);

    return defineBestAccount({
      job,
      template,
      accounts,
    });
  }
}
