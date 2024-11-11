import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AutomationModule } from './automation/automation.module';
import { GlobalModule } from './global';
import { JobsModule } from './jobs/jobs.module';
import { LoggerMiddleware } from './shared/middlewares';
import { CompanyModule } from './company/company.module';

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
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
