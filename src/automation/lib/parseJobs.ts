import * as cheerio from 'cheerio';

import { SELECTORS } from '../consts/selectors.consts';

interface Job {
  title: string;
  link: string;
  postedAt: number;
}

function parseUpworkDate(dateStr: string): number {
  // seconds
  if (dateStr.includes('second')) {
    const seconds = parseInt(dateStr.split(' ')[0]);
    return Date.now() - seconds * 1000;
  }

  // minutes
  if (dateStr.includes('minute')) {
    const minutes = parseInt(dateStr.split(' ')[0]);
    return Date.now() - minutes * 60 * 1000;
  }

  // hours
  if (dateStr.includes('hour')) {
    const hours = parseInt(dateStr.split(' ')[0]);
    return Date.now() - hours * 60 * 60 * 1000;
  }

  // days
  if (dateStr.includes('day')) {
    // yesterday
    if (dateStr.includes('yesterday')) {
      return Date.now() - 24 * 60 * 60 * 1000;
    }

    const days = parseInt(dateStr.split(' ')[0]);
    return Date.now() - days * 24 * 60 * 60 * 1000;
  }

  // weeks
  if (dateStr.includes('week')) {
    // last week
    if (dateStr.includes('last')) {
      return Date.now() - 7 * 24 * 60 * 60 * 1000;
    }

    const weeks = parseInt(dateStr.split(' ')[0]);
    return Date.now() - weeks * 7 * 24 * 60 * 60 * 1000;
  }

  // months
  if (dateStr.includes('month')) {
    // last month
    if (dateStr.includes('last')) {
      return Date.now() - 30 * 24 * 60 * 60 * 1000;
    }

    const months = parseInt(dateStr.split(' ')[0]);
    return Date.now() - months * 30 * 24 * 60 * 60 * 1000;
  }

  // otherwise year ago
  return Date.now() - 365 * 24 * 60 * 60 * 1000;
}

export function parseJobs(html: string): Job[] {
  const $ = cheerio.load(html);
  const jobCards = $(SELECTORS.job.el.jobCard);
  const jobs: Job[] = [];

  jobCards.map((_, el) => {
    const titleEl = $(el).find('a');
    const link = titleEl.attr('href');
    const title = titleEl.text();

    const postedAtStr = $(el)
      .find('[data-test="job-pubilshed-date"]')
      .children()
      .last()
      .text();

    const postedAt = parseUpworkDate(postedAtStr as any);

    jobs.push({ title, link, postedAt });
  });

  console.log('Jobs:', jobs);

  return jobs;
}
