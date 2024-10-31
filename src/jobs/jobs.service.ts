import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../global';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './types/job.types';

@Injectable()
export class JobsService {
  constructor(private db: PrismaService) {}

  // async create(d: Dto<Job>): Promise<Job> {
  //   return this.db.job.create({
  //     data: {},
  //   });
  // }
  //
  // async update(user: User, id: Id, data: Partial<Dto<Job>>): Promise<Job> {
  //   return this.db.job
  //     .update({
  //       where: { id, userId: user.id },
  //       data: data as any,
  //     })
  //     .catch(() => {
  //       throw new BadRequestException('Could not update job');
  //     }) as unknown as Job;
  // }
  //
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
  //
  // async findOne(user: User, id: Id): Promise<Job> {
  //   return this.db.job
  //     .findUniqueOrThrow({ where: { id, userId: user.id } })
  //     .catch(() => {
  //       throw new BadRequestException('Job not found');
  //     }) as unknown as Job;
  // }
  //
  // async remove(user: User, id: Id) {
  //   await this.db.job.delete({ where: { id, userId: user.id } }).catch(() => {
  //     throw new BadRequestException('Could not delete job');
  //   });
  // }
}
