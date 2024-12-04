import { JobSearchParams } from '../../search-suits/types/search-suit.types';
import { UPWORK_URL } from '../consts/upwork-urls.consts';

export function getJobSearchLink(params: JobSearchParams) {
  const { locations, skills, duration, budget, paymentVerified, keywords } =
    params;

  const queryParams = new URLSearchParams({
    sort: 'recency',
    per_page: '50',
    t: '0,1',
  });

  if (locations?.length) {
    queryParams.set('location', locations.join(','));
  }

  if (skills?.length) {
    queryParams.set('ontology_skill_uid', skills.join(','));
  }

  if (duration?.length) {
    queryParams.set('duration_v3', duration.join(','));
  }

  if (budget?.hourly) {
    queryParams.set(
      'hourly_rate',
      `${budget.hourly.min || ''}-${budget.hourly.max || ''}`,
    );
  }

  if (budget?.fixed) {
    queryParams.set(
      'amount',
      `${budget.fixed.min || ''}-${budget.fixed.max || ''}`,
    );
  }

  if (paymentVerified) {
    queryParams.set('payment_verified', '1');
  }

  if (keywords?.length) {
    queryParams.set('q', `(${keywords.join(' OR ')})`);
  }

  return `${UPWORK_URL.search}?${queryParams.toString()}`;
}
