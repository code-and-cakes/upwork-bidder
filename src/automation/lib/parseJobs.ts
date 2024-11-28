import * as cheerio from 'cheerio';

import { Job } from '../../jobs/types/job.types';
import { SELECTORS } from '../consts/selectors.consts';
import { UPWORK_URL } from '../consts/upwork-urls.consts';
import { parseUpworkDate } from './parseUpworkDate';

export function parseJobs(html: string): Dto<Job>[] {
  const $ = cheerio.load(html);
  const jobCards = $(SELECTORS.job.el.jobCard);
  const jobs: Dto<Job>[] = [];

  jobCards.map((_, el) => {
    const titleEl = $(el).find('a');
    const link = UPWORK_URL.base + titleEl.attr('href');
    const title = titleEl.text();

    const postedAtStr = $(el)
      .find('[data-test="job-pubilshed-date"]')
      .children()
      .last()
      .text();

    const postedAt = new Date(parseUpworkDate(postedAtStr as any));

    const skills = $(el)
      .find(SELECTORS.job.el.previewSkill)
      .toArray()
      .map((el) => $(el).text());

    const description = $(el).find(SELECTORS.job.el.previewDescription).text();

    jobs.push({
      title,
      link,
      postedAt,
      data: { skills, description },
      accountId: null,
      companyId: null,
    });
  });

  return jobs;
}
