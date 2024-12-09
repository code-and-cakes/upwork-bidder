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
}
