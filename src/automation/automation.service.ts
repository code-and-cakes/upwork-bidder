import { Injectable } from '@nestjs/common';
import { ElementHandle } from 'puppeteer';

import { AccountsService } from '../accounts/accounts.service';
import { answerQuestion } from '../ai/answer-question';
import { generateCL } from '../ai/generate-cl';
import { CasesService } from '../cases/cases.service';
import { CompaniesService } from '../companies/companies.service';
import { JobsService } from '../jobs/jobs.service';
import { Job } from '../jobs/types/job.types';
import { PuppeteerService } from '../puppeteer/puppeteer.service';
import { wait } from '../shared/lib/wait';
import { LOCAL_STORAGE_VALUES } from './consts/localStorage.consts';
import { SELECTORS } from './consts/selectors.consts';
import { UPWORK_URL } from './consts/upwork-urls.consts';
// import { testSearchSuit1 } from './data/test-search-suit-1';
import { getJobSearchLink } from './lib/getJobSearchLink';
import { getJobSearchParams } from './lib/getJobSearchParams';
import { parseJobInfo } from './lib/parseJobInfo';
import { parseJobs } from './lib/parseJobs';
import { JobInfo, JobSearchParams } from './types/job.types';

@Injectable()
export class AutomationService {
  private isLoginActive = false;

  constructor(
    private readonly ui: PuppeteerService,
    private readonly jobsService: JobsService,
    private readonly accountsService: AccountsService,
    private readonly casesService: CasesService,
    private readonly companyService: CompaniesService,
  ) {
    this.ui.authFn = this.login.bind(this);
    // this.ui.init().then(() => this.start());
  }

  async findJobs(companyId: Id, dynamicParams: JobSearchParams) {
    const params = getJobSearchParams(dynamicParams);
    const url = getJobSearchLink(params);

    console.log('Navigating to:', url);
    await this.ui.navigateTo(url);
    const html = await this.ui.getHTML();
    const parsedJobs = parseJobs(html);
    await this.jobsService.createMany(companyId, parsedJobs);
  }

  async applyForJob(job: Job) {
    await this.ui.navigateTo(job.link);
    await this.ui.scrollDownAndUp();

    const html = await this.ui.getHTML();
    const jobData = parseJobInfo(html);

    await this.ui.click(SELECTORS.job.btn.apply);

    await this.ui.waitForElement(SELECTORS.bidding.input.coverLetter, 10000);

    const coverLetter = await this.generateCL({
      jobData,
      accountId: job.accountId,
      companyId: job.companyId,
    });

    await this.ui.scrollIntoView(SELECTORS.bidding.input.coverLetter);
    await this.ui.type(SELECTORS.bidding.input.coverLetter, coverLetter, 10);

    const questions = await this.ui.findMany('.questions-area textarea');
    await this.answerQuestions({
      jobData,
      questions,
      companyId: job.companyId,
    });
  }

  async start() {
    await this.ui.navigateTo(UPWORK_URL.bestMatches);
    await wait(1000);
    await this.waitForLogin();
    // const companyId = 'e9abbaae-72d0-45e5-97a7-2c29ae152300';

    // await this.findJobs(companyId, testSearchSuit1);

    // const job = await this.jobsService.findOne(
    //   'e9abbaae-72d0-45e5-97a7-2c29ae152300',
    // );
    //
    // await this.applyForJob(job);
  }

  async generateCL(d: {
    jobData: JobInfo;
    accountId: string;
    companyId: string;
  }) {
    const { jobData, accountId } = d;

    const accountData = await this.accountsService.findOne(accountId);
    const cases = await this.casesService.findAll();
    const companyData = await this.companyService.findOne(d.companyId);

    return generateCL({
      cases,
      jobData,
      accountData,
      companyData,
    });
  }

  private async answerQuestions(d: {
    jobData: JobInfo;
    questions: ElementHandle[];
    companyId: string;
  }) {
    const { jobData, questions, companyId } = d;
    let questionIdx = 0;
    const companyData = await this.companyService.findOne(companyId);

    for (const questionEl of questions) {
      const answer = await answerQuestion({
        question: jobData.questions[questionIdx],
        jobData,
        companyData,
      });
      await questionEl.type(answer);
      questionIdx += 1;
    }
  }

  // Auth
  private async login() {
    console.log('Logging in...');
    this.isLoginActive = true;

    await this.ui.setToLocalStorage(LOCAL_STORAGE_VALUES);

    await wait(2000);

    await this.ui.type(SELECTORS.login.input.email, process.env.UPWORK_EMAIL);
    await this.ui.click(SELECTORS.login.btn.goToPwd);

    await this.ui.type(SELECTORS.login.input.pwd, process.env.UPWORK_PASSWORD);
    await this.ui.click(SELECTORS.login.btn.login);

    try {
      await wait(3000);
      await this.ui.click(SELECTORS.login.input.secret);
      await wait(1000);
      await this.ui.type(
        SELECTORS.login.input.secret,
        process.env.UPWORK_SECRET,
      );
      await this.ui.click(SELECTORS.login.btn.login);
    } catch {}

    await this.ui.saveCookies();
    this.isLoginActive = false;
  }

  private waitForLogin() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!this.isLoginActive) {
          clearInterval(interval);
          resolve(true);
        }
      }, 1000);
    });
  }
}
