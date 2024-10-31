import { Location } from '../consts/locations.consts';
import { Skill } from '../consts/skills.consts';
import { JobDuration, JobSearchParams } from '../types/job.types';

export const testSearchSuit1: JobSearchParams = {
  locations: [Location.uae, Location.usa],
  skills: [Skill.react, Skill.js, Skill.ts],
  duration: [JobDuration.short, JobDuration.medium, JobDuration.long],
  budget: {
    hourly: {
      min: 40,
    },
    fixed: {
      min: 2000,
    },
  },
  paymentVerified: true,
  keywords: ['react', 'typescript'],
};
