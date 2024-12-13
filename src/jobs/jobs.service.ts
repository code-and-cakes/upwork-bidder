import { BadRequestException, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';

import { AccountsService } from '../accounts/accounts.service';
import { defineBestAccount } from '../ai/define-best-account';
import { JobDetails } from '../automation/types/job.types';
import { PrismaService } from '../global';
import { PromptTemplatesService } from '../prompt-templates/prompt-templates.service';
import { AbstractCrudService } from '../shared/classes/abstract-crud.service';
import { PageDto } from '../shared/dto/page.dto';
import { PageMetaDto } from '../shared/dto/page-meta.dto';
import { JobsQueryDto } from './dto/jobs-query.dto';
import { Job } from './types/job.types';

@Injectable()
export class JobsService extends AbstractCrudService<Job> {
  constructor(
    private db: PrismaService,
    private readonly accountsService: AccountsService,
    private readonly ptService: PromptTemplatesService,
  ) {
    super(db, 'Job');
  }

  async findOne(id: Id): Promise<Job> {
    return this.db.job.findUniqueOrThrow({ where: { id } }).catch(() => {
      throw new BadRequestException('Job not found');
    }) as unknown as Job;
  }

  async findMany(q: JobsQueryDto) {
    const { accountId, approved, applied, companyId, take, skip, order } = q;

    const jobs = await this.db.job.findMany({
      where: {
        accountId,
        approved,
        applied,
        companyId,
      },
      skip,
      take,
      orderBy: { createdAt: order },
    });

    const itemCount = await this.db.job.count({
      where: { accountId, approved, applied, companyId },
    });

    const pageMetaDto = new PageMetaDto({ pageOptionsDto: q, itemCount });
    return new PageDto(jobs, pageMetaDto);
  }

  async createMany(companyId: Id, jobs: Dto<Job>[]): Promise<Job[]> {
    const accounts = await this.accountsService.findAll(companyId);

    return Promise.all(
      jobs.map((job) => this.createWithAccount(job, accounts, companyId)),
    );
  }

  async getDetails(id: Id): Promise<JobDetails> {
    const job = await this.findOne(id);

    return {
      title: job.title,
      description: job.data.description,
      skills: job.data.skills,
    };
  }

  private async createWithAccount(
    data: Omit<Dto<Job>, 'accountId'>,
    accounts: Account[],
    companyId: Id,
  ): Promise<Job> {
    const existingJob = await this.db.job.findFirst({
      where: {
        link: data.link,
      },
    });

    if (existingJob) {
      return existingJob as Job;
    }

    const template = await this.ptService.findActive(
      companyId,
      'ACCOUNT_SELECTION',
    );

    const accountId = await defineBestAccount({
      job: data as Job,
      accounts,
      template,
    });

    return this.create({ ...data, accountId, companyId });
  }

  markApplied(id: Id) {
    return this.db.job.update({
      where: {
        id,
      },
      data: {
        applied: true,
      },
    });
  }
}
