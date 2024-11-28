import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AccountsModule } from './accounts/accounts.module';
// import { AutomationModule } from './automation/automation.module';
import { CasesModule } from './cases/cases.module';
import { CompaniesModule } from './companies/companies.module';
import { GlobalModule } from './global';
import { JobsModule } from './jobs/jobs.module';
import { SandboxModule } from './sandbox/sandbox.module';
import { LoggerMiddleware } from './shared/middlewares';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    GlobalModule,
    // AutomationModule,
    JobsModule,
    CompaniesModule,
    AccountsModule,
    CasesModule,
    SandboxModule,
    SkillsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
