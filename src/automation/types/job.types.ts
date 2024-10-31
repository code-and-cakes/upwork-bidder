import { Location } from '../consts/locations.consts';

export enum JobDuration {
  short = 'month',
  medium = 'semester',
  long = 'ongoing',
}

export interface Budget {
  hourly: {
    min?: number;
    max?: number;
  };
  fixed: {
    min?: number;
    max?: number;
  };
}

export interface JobSearchParams {
  locations?: Location[];
  skills?: string[];
  keywords?: string[];

  // static
  duration?: JobDuration[];
  budget?: Budget;
  paymentVerified?: true;
}
