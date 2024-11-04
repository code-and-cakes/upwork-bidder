import { Module } from '@nestjs/common';

import { JobsModule } from '../jobs/jobs.module';
import { PuppeteerService } from '../puppeteer/puppeteer.service';
import { AutomationService } from './automation.service';

@Module({
  providers: [AutomationService, PuppeteerService],
  exports: [AutomationService],
  imports: [JobsModule],
})
export class AutomationModule {}
