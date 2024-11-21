import { Injectable } from '@nestjs/common';

import { PrismaService } from '../global';
import { Job } from './types/job.types';

@Injectable()
export class JobsService {
  constructor(private db: PrismaService) {}

  async create(d: Dto<Job>): Promise<Job> {
    return this.db.job.create({
      data: {
        data: d.data,
        title: d.title,
        postedAt: d.postedAt,
        link: d.link,
      },
    }) as unknown as Job;
  }

  async createMany(jobs: Dto<Job>[]): Promise<Job[]> {
    return this.db.job.createManyAndReturn({
      data: jobs.map((job) => ({
        data: job.data,
        title: job.title,
        postedAt: job.postedAt,
        link: job.link,
      })),
      skipDuplicates: true,
    }) as unknown as Job[];
  }

  async update(id: Id, data: Partial<Dto<Job>>): Promise<Job> {
    return this.db.job
      .update({
        where: { id },
        data: data as any,
      })
      .catch(() => {
        throw new Error('Could not update job');
      }) as unknown as Job;
  }

  // async findAll(user: User, query: JobsQueryDto) {
  //   const { take, skip, order, sortField, search } = query;
  //
  //   const jobs = await this.db.job.findMany({
  //     where: {
  //       user: { id: user.id },
  //       OR: search
  //         ? [
  //             { title: { contains: search, mode: 'insensitive' } },
  //             { query: { contains: search, mode: 'insensitive' } },
  //           ]
  //         : undefined,
  //     },
  //     skip,
  //     take,
  //     orderBy: { [sortField || 'createdAt']: order },
  //     select: {
  //       id: true,
  //       query: true,
  //       title: true,
  //       lastRunAt: true,
  //       createdAt: true,
  //       lastJobbedAt: true,
  //       lastQueriedAt: true,
  //       user: { select: { id: true } },
  //       runs: true,
  //       isFinished: true,
  //     },
  //   });
  //
  //   const itemCount = await this.db.job.count({
  //     where: { user: { id: user.id } },
  //   });
  //
  //   const pageMetaDto = new PageMetaDto({ pageOptionsDto: query, itemCount });
  //   return new PageDto(jobs, pageMetaDto);
  // }

  async findOne(id: Id): Promise<Job> {
    return this.db.job.findUniqueOrThrow({ where: { id } }).catch(() => {
      throw new Error('Job not found');
    }) as unknown as Job;
  }

  async remove(id: Id) {
    await this.db.job.delete({ where: { id } }).catch(() => {
      throw new Error('Could not delete job');
    });
  }
}
