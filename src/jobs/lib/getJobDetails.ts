import { JobDetails, JobInfo } from '../../automation/types/job.types';
import { Job } from '../types/job.types';

export function getJobDetailsFromJob(job: Job): JobDetails {
  return {
    title: job.title,
    description: job.data.description,
    skills: job.data.skills,
  };
}

export function getJobDetailsFromJobInfo(jobInfo: JobInfo): JobDetails {
  return {
    title: jobInfo.title,
    description: jobInfo.description,
    skills: jobInfo.skills,
    domain: jobInfo.client.company.domain,
  };
}
