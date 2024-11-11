import * as cheerio from 'cheerio';

import { SELECTORS } from '../consts/selectors.consts';
import { JobDuration, JobInfo } from '../types/job.types';

const featureIconAtrMap = {
  'clock-hourly': 'hoursPerWeek',
  duration2: 'duration',
  'clock-timelog': 'hourly',
};

const parseHoursPerWeek = (val: string) => val === 'More than 30 hrs/week';

const parseDuration = (val: string) => {
  if (val.includes('1-3')) {
    return JobDuration.short;
  }

  if (val.includes('3-6')) {
    return JobDuration.medium;
  }

  return JobDuration.long;
};

const parseHourly = (val: string) => {
  const regex = /\$\d+(\.\d{2})?/g;
  const matches = val.match(regex);
  return {
    min: matches[0],
    max: matches[1],
  };
};

function parseFeatures(
  features: {
    feature: string;
    value: string;
  }[],
): Pick<JobInfo, 'budget' | 'duration' | 'more30Hr'> {
  const val = {
    budget: {
      hourly: {},
      fixed: {},
    },
    duration: JobDuration.short,
    more30Hr: undefined,
  };

  features.forEach((i) => {
    const key = featureIconAtrMap[i.feature];

    if (key === 'hourly') {
      val.budget.hourly = parseHourly(i.value);
    }

    if (key === 'duration') {
      val.duration = parseDuration(i.value);
    }

    if (key === 'hoursPerWeek') {
      val.more30Hr = parseHoursPerWeek(i.value);
    }
  });

  return val;
}

export function parseJobInfo(html: string): JobInfo {
  const $ = cheerio.load(html);
  const title = $(SELECTORS.job.el.jobTitle).text();
  const description = $(SELECTORS.job.el.jobDescription).text();

  const features = $(SELECTORS.job.el.jobFeature)
    .toArray()
    .map((el) => {
      const feature = $(el).children().first().attr()['data-cy'];
      const value = $(el).children().first().next().text();
      return { feature, value };
    });

  const { budget, duration, more30Hr } = parseFeatures(features);

  const questions = $(SELECTORS.job.el.applicationQuestion)
    .toArray()
    .map((el) => $(el).text().split('\n')[1].trim());

  const skills = $(SELECTORS.job.el.skill)
    .toArray()
    .map((el) => $(el).text().trim());

  const clientCountry = $(SELECTORS.job.el.clientCountry).text();
  const clientCity =
    $(SELECTORS.job.el.clientCity).text()?.split('\n')[0] || undefined;
  const clientCompanyDomain =
    $(SELECTORS.job.el.clientCompanyDomain).text() || undefined;
  const clientCompanySize =
    $(SELECTORS.job.el.clientCompanySize).text() || undefined;
  const clientRatingRaw = $(SELECTORS.job.el.clientRating)?.text();
  const clientRating = clientRatingRaw
    ? parseFloat(clientRatingRaw)
    : undefined;

  return {
    title,
    description,
    duration,
    budget,
    client: {
      rating: clientRating,
      location: {
        country: clientCountry,
        city: clientCity,
      },
      company: {
        domain: clientCompanyDomain,
        size: clientCompanySize,
      },
    },
    more30Hr,
    questions,
    skills,
  };
}
