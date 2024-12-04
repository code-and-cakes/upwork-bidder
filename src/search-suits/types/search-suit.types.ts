import { Location } from '../../automation/consts/locations.consts';
import { Budget, JobDuration } from '../../automation/types/job.types';
import { SearchSuit as PrismaSearchSuit } from '.prisma/client';

export interface JobSearchParams {
  locations?: Location[];
  skills?: string[];
  keywords?: string[];

  // static
  duration?: JobDuration[];
  budget?: Budget;
  paymentVerified?: true;
}

export interface SearchSuit extends Omit<PrismaSearchSuit, 'value'> {
  value: JobSearchParams;
}
