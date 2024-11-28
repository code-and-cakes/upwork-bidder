import { Injectable } from '@nestjs/common';

import { AutomationService } from '../automation/automation.service';
import { JobInfo } from '../automation/types/job.types';
import { PrismaService } from '../global';
import { JobsService } from '../jobs/jobs.service';
import { GenerateClDto } from './dto/generate-cl.dto';

@Injectable()
export class SandboxService {
  constructor(
    private readonly db: PrismaService,
    private readonly automationService: AutomationService,
    private readonly jobsService: JobsService,
  ) {}

  async generateCL(d: GenerateClDto) {
    const { accountId, companyId, jobName, jobDomain, jobDescription, skills } =
      d;

    const jobData = {
      title: jobName,
      description: jobDescription,
      skills: [skills],
      client: { company: { domain: jobDomain } },
    } as JobInfo;

    return this.automationService.generateCL({
      companyId,
      accountId,
      jobData,
    });
  }
}
