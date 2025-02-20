import { Module } from '@nestjs/common';

import { AccountsModule } from '../accounts/accounts.module';
import { CompaniesModule } from '../companies/companies.module';
import { PromptTemplatesModule } from '../prompt-templates/prompt-templates.module';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
  imports: [AccountsModule, PromptTemplatesModule, CompaniesModule],
})
export class JobsModule {}
