import { BadRequestException, Injectable } from '@nestjs/common';
import { Account, PromptType } from '@prisma/client';

import { AccountsService } from '../accounts/accounts.service';
import { approveJob } from '../ai/approve-job';
import { defineBestAccount } from '../ai/define-best-account';
import { JobDetails } from '../automation/types/job.types';
import { CompaniesService } from '../companies/companies.service';
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
    private readonly companyService: CompaniesService,
  ) {
    super(db, 'Job');
  }

  async findOne(id: Id): Promise<Job> {
    return this.db.job.findUniqueOrThrow({ where: { id } }).catch(() => {
      throw new BadRequestException('Job not found');
    }) as unknown as Job;
  }

  async findMany(q: JobsQueryDto) {
    const {
      accountId,
      approved,
      applied,
      companyId,
      take,
      skip,
      order,
      success,
      approvePercentage,
    } = q;

    let approveRange = {};
    if (approvePercentage !== undefined) {
      if (approvePercentage <= 40) {
        approveRange = { gte: 0, lte: 40 }; // 0-40
      } else if (approvePercentage <= 80) {
        approveRange = { gt: 40, lte: 80 }; // 40-80
      } else {
        approveRange = { gt: 80, lte: 100 }; // 80-100
      }
    }

    const jobs = await this.db.job.findMany({
      where: {
        accountId,
        approved,
        applied,
        companyId,
        approvePercentage: approveRange,
        success,
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
    const accounts = await this.accountsService.findAll(companyId, true);

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
      client: job.data.client,
    };
  }

  async approve(id: Id, value: boolean, approvePercentage?: number) {
    return this.db.job.update({
      where: {
        id,
      },
      data: {
        approved: value,
        approvePercentage: approvePercentage,
      },
    });
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
      return existingJob as unknown as Job;
    }

    const accountSelectionTemplate = await this.ptService.findActive(
      companyId,
      PromptType.ACCOUNT_SELECTION,
    );

    const accountId = await defineBestAccount({
      job: data as Job,
      accounts,
      template: accountSelectionTemplate,
    });

    const job = await this.create({ ...data, accountId, companyId });

    this.automatedApproveJob(job.id, companyId);

    return job;
  }

  async automatedApproveJob(id: Id, companyId: Id) {
    const approveJobTemplate = await this.ptService.findActive(
      companyId,
      PromptType.APPROVE_JOB,
    );

    if (!approveJobTemplate) {
      console.log('No approve job template found');
      return;
    }

    const job = await this.getDetails(id);

    const company = await this.companyService.findOne(companyId);

    const approvePercentage = await approveJob({
      job,
      template: approveJobTemplate,
      company,
    });

    if (!approvePercentage) {
      return;
    }

    const isAutomatedApprove = approvePercentage >= 80;

    return this.approve(id, isAutomatedApprove, approvePercentage);
  }

  markApplied(id: Id, success: boolean) {
    return this.db.job.update({
      where: {
        id,
      },
      data: {
        applied: true,
        success,
      },
    });
  }
}
