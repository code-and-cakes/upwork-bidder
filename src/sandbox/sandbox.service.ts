import { Injectable } from '@nestjs/common';

import { AccountsService } from '../accounts/accounts.service';
import { answerQuestion } from '../ai/answer-question';
import { approveJob } from '../ai/approve-job';
import { defineBestAccount } from '../ai/define-best-account';
import { defineBestCases } from '../ai/define-best-cases';
import { generateCL } from '../ai/generate-cl';
import { CasesService } from '../cases/cases.service';
import { CompaniesService } from '../companies/companies.service';
import { JobsService } from '../jobs/jobs.service';
import { PromptTemplatesService } from '../prompt-templates/prompt-templates.service';
import { AutomatedApproveJobDto } from './dto/automated-approve-job.dto';
import { AutomatedQaDto } from './dto/automated-qa.dto';
import { DefineBestCasesDto } from './dto/define-best-cases.dto';
import { GenerateClDto } from './dto/generate-cl.dto';

@Injectable()
export class SandboxService {
  constructor(
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
    const cases = await this.casesService.findMany({ companyId });
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

    return defineBestCases(
      {
        cases,
        job,
        template,
      },
      true,
    );
  }

  async defineBestAccount(d: DefineBestCasesDto) {
    const { companyId, templateId, jobId } = d;

    const job = await this.jobsService.findOne(jobId);
    const accounts = await this.accountsService.findAll(companyId, true);
    const template = await this.ptService.findOne(templateId);

    const accountId = await defineBestAccount({
      job,
      template,
      accounts,
    });

    const selectedAccount = accounts.find((i) => i.id === accountId);

    return `${selectedAccount?.firstName} ${selectedAccount?.lastName}`;
  }

  async approveJob(d: AutomatedApproveJobDto) {
    const { companyId, templateId, jobId } = d;

    const job = await this.jobsService.getDetails(jobId);
    const template = await this.ptService.findOne(templateId);
    const company = await this.companyService.findOne(companyId);

    const result = await approveJob({
      job,
      template,
      company,
    });

    return { result };
  }

  async qa(d: AutomatedQaDto) {
    const { companyId, templateId, jobId, question } = d;

    const job = await this.jobsService.getDetails(jobId);
    const company = await this.companyService.findOne(companyId);
    const template = await this.ptService.findOne(templateId);

    return answerQuestion({
      job,
      company,
      template,
      question,
    });
  }
}
