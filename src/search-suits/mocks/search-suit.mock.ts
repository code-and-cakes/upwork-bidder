import { SearchSuit } from '@prisma/client';

export const searchSuitMock: Dto<SearchSuit> = {
  name: 'Test Search Suit',
  active: true,
  link: 'https://www.upwork.com/nx/search/jobs/?from_recent_search=true&q=nodejs&page=1&per_page=50',
  companyId: undefined,
};
