import { Job } from '@prisma/client';
import * as cheerio from 'cheerio';

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

    jobs.push({ title, link, postedAt, data: {} });
  });

  console.log('Jobs:', jobs);

  return jobs;
}
