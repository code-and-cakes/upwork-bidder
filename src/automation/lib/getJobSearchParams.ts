import { JobSearchParams } from '../../search-suits/types/search-suit.types';

export const defaultSearchParams: JobSearchParams = {
  locations: [],
  skills: [],
  duration: [],
  budget: {
    hourly: {
      min: 0,
    },
    fixed: {
      min: 0,
    },
  },
  paymentVerified: true,
};

export function getJobSearchParams(params: Partial<JobSearchParams>) {
  return { defaultSearchParams, ...params };
}
