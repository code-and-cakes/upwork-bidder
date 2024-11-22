import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AccountsModule } from './accounts/accounts.module';
import { AutomationModule } from './automation/automation.module';
import { CasesModule } from './cases/cases.module';
import { CompanyModule } from './company/company.module';
import { GlobalModule } from './global';
import { JobsModule } from './jobs/jobs.module';
import { LoggerMiddleware } from './shared/middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    GlobalModule,
    AutomationModule,
    JobsModule,
    CompanyModule,
    AccountsModule,
    CasesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
