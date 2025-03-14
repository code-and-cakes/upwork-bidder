import { ClientInfoForApproveJob } from 'src/automation/types/job.types';

import { Job as PrismaJob } from '.prisma/client';

export interface Job extends Omit<PrismaJob, 'data'> {
  data: {
    skills: string[];
    description: string;
    client?: ClientInfoForApproveJob;
  };
}
