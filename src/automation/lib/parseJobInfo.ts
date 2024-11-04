import { Job } from '@prisma/client';
import * as cheerio from 'cheerio';

import { writeToFile } from '../../shared/lib/write-to-file';
import { SELECTORS } from '../consts/selectors.consts';
import { UPWORK_URL } from '../consts/upwork-urls.consts';
import { Budget, JobDuration } from '../types/job.types';
import { parseUpworkDate } from './parseUpworkDate';

interface ClientInfo {
  rating: number;
  location: {
    country: string;
    city?: string;
  };
  company: {
    domain: string;
    size: string;
  };
}

interface JobInfo {
  title: string;
  description: string;
  duration: JobDuration;
  locations: string[];
  budget: Budget;
  skills?: string[];
  client: ClientInfo;
  hoursPerWeek: number;
  projectType: number;
  questions: string[];
  qualifications: string[];
}

export function parseJobInfo(html: string): JobInfo {
  const $ = cheerio.load(html);
  const jobCards = $(SELECTORS.job.el.jobCard);

  return {
    title: '',
    description: '',
    duration: JobDuration.short,
    locations: [],
    budget: {
      hourly: {},
      fixed: {},
    },
    client: {
      rating: 0,
      location: {
        country: '',
      },
      company: {
        domain: '',
        size: '',
      },
    },
    hoursPerWeek: 0,
    projectType: 0,
    questions: [],
    qualifications: [],
  };
}
