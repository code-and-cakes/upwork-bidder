import { Job as pJob } from '.prisma/client';

export interface Job extends Omit<pJob, 'data'> {
  data: any;
}
