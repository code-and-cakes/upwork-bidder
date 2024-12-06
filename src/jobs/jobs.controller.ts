import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateJobsDto } from './dto/create-job.dto';
import { JobsQueryDto } from './dto/jobs-query.dto';
import { JobsService } from './jobs.service';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  findMany(@Query() q: JobsQueryDto) {
    return this.jobsService.findMany(q);
  }

  @Post('company/:id')
  create(@Param('id') companyId: Id, @Body() d: CreateJobsDto) {
    return this.jobsService.createMany(companyId, d.jobs as any);
  }

  @Post(':id/apply')
  markApplied(@Param('id') id: Id) {
    return this.jobsService.markApplied(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
