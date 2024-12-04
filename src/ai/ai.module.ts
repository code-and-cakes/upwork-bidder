import { Module } from '@nestjs/common';

import { AccountsModule } from '../accounts/accounts.module';
import { CasesModule } from '../cases/cases.module';
import { CompaniesModule } from '../companies/companies.module';
import { JobsModule } from '../jobs/jobs.module';
import { PromptTemplatesModule } from '../prompt-templates/prompt-templates.module';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';

@Module({
  exports: [AIService],
  controllers: [AIController],
  providers: [AIService],
  imports: [
    JobsModule,
    AccountsModule,
    CasesModule,
    CompaniesModule,
    PromptTemplatesModule,
  ],
})
export class AIModule {}
