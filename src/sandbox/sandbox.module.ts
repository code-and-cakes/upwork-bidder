import { Module } from '@nestjs/common';

import { AccountsModule } from '../accounts/accounts.module';
import { CasesModule } from '../cases/cases.module';
import { CompaniesModule } from '../companies/companies.module';
import { JobsModule } from '../jobs/jobs.module';
import { SandboxController } from './sandbox.controller';
import { SandboxService } from './sandbox.service';

@Module({
  controllers: [SandboxController],
  providers: [SandboxService],
  imports: [JobsModule, AccountsModule, CasesModule, CompaniesModule],
})
export class SandboxModule {}
