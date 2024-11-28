import { Injectable } from '@nestjs/common';

import { AccountsService } from '../accounts/accounts.service';
import { generateCL } from '../ai/generate-cl';
import { JobInfo } from '../automation/types/job.types';
import { CasesService } from '../cases/cases.service';
import { CompaniesService } from '../companies/companies.service';
import { PrismaService } from '../global';
import { JobsService } from '../jobs/jobs.service';
import { GenerateClDto } from './dto/generate-cl.dto';

@Injectable()
export class SandboxService {
  constructor(
    private readonly db: PrismaService,
    private readonly jobsService: JobsService,

    private readonly accountsService: AccountsService,
    private readonly casesService: CasesService,
    private readonly companyService: CompaniesService,
  ) {}

  async generateCL(d: GenerateClDto) {
    const { accountId, companyId, jobName, jobDomain, jobDescription, skills } =
      d;

    const jobData = {
      title: jobName,
      description: jobDescription,
      skills: [skills],
      client: { company: { domain: jobDomain } },
    } as JobInfo;

    const accountData = await this.accountsService.findOne(accountId);
    const cases = await this.casesService.findAll();
    const companyData = await this.companyService.findOne(companyId);

    return generateCL({
      cases,
      jobData,
      accountData,
      companyData,
    });
  }
}
