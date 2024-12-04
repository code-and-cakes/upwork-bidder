import { JobSearchParams } from '../../search-suits/types/search-suit.types';

export const defaultSearchParams: JobSearchParams = {
  locations: [],
  skills: [],
  duration: [],
  budget: {
    hourly: {
      min: 40,
    },
    fixed: {
      min: 2000,
    },
  },
  paymentVerified: true,
};

export function getJobSearchParams(params: Partial<JobSearchParams>) {
  return { defaultSearchParams, ...params };
}
