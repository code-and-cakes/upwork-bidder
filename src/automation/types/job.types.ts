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

export interface ClientInfo {
  rating?: number;
  location: {
    country: string;
    city?: string;
  };
  company: {
    domain?: string;
    size?: string;
  };
}

export interface ClientInfoForApproveJob {
  clientCountry: string;
  clientCity: string;
  clientCompanyDomain: string;
  clientCompanySize: string;
  clientRating: number;
  clientPaymentVerified: boolean;
  clientJobsPostedNumber: string;
  clientHireRate: string;
  clientOpenJobs: string;
  clientTotalHires: string;
  clientTotalSpentNumber: string;
  clientActiveHires: string;
  clientHourlyRateNumber: string;
  clientTotalHoursNumber: string;
}

export interface JobInfo {
  title: string;
  description: string;
  duration: JobDuration;
  budget: Budget;
  skills?: string[];
  client: ClientInfo;
  more30Hr?: boolean;
  questions: string[];
}

export interface JobDetails {
  title: string;
  description: string;
  skills: string[];
  domain?: string;
  client?: ClientInfoForApproveJob;
}
