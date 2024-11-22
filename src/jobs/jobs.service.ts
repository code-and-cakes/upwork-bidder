import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';

import { AccountsService } from '../accounts/accounts.service';
import { defineBestAccount } from '../ai/define-best-account';
import { AbstractCrudService } from '../cases/abstract-crud.service';
import { PrismaService } from '../global';
import { Job } from './types/job.types';

@Injectable()
export class JobsService extends AbstractCrudService<Job> {
  constructor(
    private db: PrismaService,
    private readonly accountsService: AccountsService,
  ) {
    super(db, 'Job');
  }

  async createMany(jobs: Dto<Job>[]): Promise<Job[]> {
    const accounts = await this.accountsService.findAll();
    return Promise.all(
      jobs.map((job) => this.createWithAccount(job, accounts)),
    );
  }

  private async createWithAccount(
    data: Omit<Dto<Job>, 'accountId'>,
    accounts: Account[],
  ): Promise<Job> {
    const accountId = await defineBestAccount({
      jobData: data as Job,
      accounts,
    });

    return this.create({ ...data, accountId });
  }
}
