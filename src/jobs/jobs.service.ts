import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';

import { AccountsService } from '../accounts/accounts.service';
import { defineBestAccount } from '../ai/define-best-account';
import { getHTMLFromUrl } from '../automation/lib/getHTMLFromUrl';
import { parseJobInfo } from '../automation/lib/parseJobInfo';
import { JobInfo } from '../automation/types/job.types';
import { PrismaService } from '../global';
import { AbstractCrudService } from '../shared/classes/abstract-crud.service';
import { Job } from './types/job.types';

@Injectable()
export class JobsService extends AbstractCrudService<Job> {
  constructor(
    private db: PrismaService,
    private readonly accountsService: AccountsService,
  ) {
    super(db, 'Job');
  }

  async getInfoByUpworkId(upworkId: string): Promise<JobInfo> {
    const html = await getHTMLFromUrl(
      `https://www.upwork.com/jobs/~${upworkId}`,
    );

    return parseJobInfo(html);
  }

  async createMany(companyId: Id, jobs: Dto<Job>[]): Promise<Job[]> {
    const accounts = await this.accountsService.findMany(companyId);
    return Promise.all(
      jobs.map((job) => this.createWithAccount(job, accounts, companyId)),
    );
  }

  private async createWithAccount(
    data: Omit<Dto<Job>, 'accountId'>,
    accounts: Account[],
    companyId: Id,
  ): Promise<Job> {
    const accountId = await defineBestAccount({
      jobData: data as Job,
      accounts,
    });

    return this.create({ ...data, accountId, companyId });
  }
}
