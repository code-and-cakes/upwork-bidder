import { Module } from '@nestjs/common';

import { PuppeteerService } from '../puppeteer/puppeteer.service';
import { AutomationService } from './automation.service';

@Module({
  providers: [AutomationService, PuppeteerService],
  exports: [AutomationService],
  imports: [],
})
export class AutomationModule {}
