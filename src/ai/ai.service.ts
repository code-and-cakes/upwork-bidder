import { Injectable } from '@nestjs/common';

import { AccountsService } from '../accounts/accounts.service';
import { CasesService } from '../cases/cases.service';
import { CompaniesService } from '../companies/companies.service';
import { PrismaService } from '../global';
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

    const accountData = await this.accountsService.findOne(accountId);
    const cases = await this.casesService.findAll();
    const companyData = await this.companyService.findOne(companyId);
    const template = await this.ptService.findActive(companyId);

    return generateCL({
      cases,
      jobData: jobInfo,
      accountData,
      companyData,
      template,
    });
  }
}
