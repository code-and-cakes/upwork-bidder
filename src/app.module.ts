import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AccountsModule } from './accounts/accounts.module';
import { AIModule } from './ai/ai.module';
import { CasesModule } from './cases/cases.module';
import { CompaniesModule } from './companies/companies.module';
import { GlobalModule } from './global';
import { JobsModule } from './jobs/jobs.module';
import { PromptTemplatesModule } from './prompt-templates/prompt-templates.module';
import { QaModule } from './qa/qa.module';
import { SandboxModule } from './sandbox/sandbox.module';
import { SearchSuitsModule } from './search-suits/search-suits.module';
import { LoggerMiddleware } from './shared/middlewares';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    GlobalModule,
    JobsModule,
    CompaniesModule,
    AccountsModule,
    CasesModule,
    SandboxModule,
    SkillsModule,
    PromptTemplatesModule,
    AIModule,
    SearchSuitsModule,
    QaModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
