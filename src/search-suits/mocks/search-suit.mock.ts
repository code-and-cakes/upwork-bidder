import { Location } from '../../automation/consts/locations.consts';
import { JobDuration } from '../../automation/types/job.types';
import { Skill } from '../../skills/consts/skills.consts';
import { SearchSuit } from '../types/search-suit.types';

export const searchSuitMock: Dto<SearchSuit> = {
  name: 'Test Search Suit',
  active: true,
  value: {
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
    excludeKeywords: ['angular'],
    expert: true,
  },
  companyId: undefined,
};
