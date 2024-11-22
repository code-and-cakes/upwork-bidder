import { Module } from '@nestjs/common';

import { AccountsModule } from '../accounts/accounts.module';
import { CasesModule } from '../cases/cases.module';
import { JobsModule } from '../jobs/jobs.module';
import { PuppeteerService } from '../puppeteer/puppeteer.service';
import { AutomationService } from './automation.service';

@Module({
  providers: [AutomationService, PuppeteerService],
  exports: [AutomationService],
  imports: [JobsModule, AccountsModule, CasesModule],
})
export class AutomationModule {}
