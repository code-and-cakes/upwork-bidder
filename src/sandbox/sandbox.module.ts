import { Module } from '@nestjs/common';

import { AutomationModule } from '../automation/automation.module';
import { JobsModule } from '../jobs/jobs.module';
import { SandboxController } from './sandbox.controller';
import { SandboxService } from './sandbox.service';

@Module({
  controllers: [SandboxController],
  providers: [SandboxService],
  imports: [AutomationModule, JobsModule],
})
export class SandboxModule {}
