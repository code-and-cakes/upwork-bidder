import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApplyJobDto } from './dto/apply-job.dto';
import { ApproveJobDto } from './dto/approve-job.dto';
import { CreateJobsDto } from './dto/create-job.dto';
import { JobsQueryDto } from './dto/jobs-query.dto';
import { UpdateJobsStatusDto } from './dto/update-jobs-status.dto';
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

  @Post(':id/approve')
  approve(@Param('id') id: Id, @Body() d: ApproveJobDto) {
    return this.jobsService.approve(id, d.value);
  }

  @Post(':id/apply')
  markApplied(@Param('id') id: Id, @Body() d: ApplyJobDto) {
    return this.jobsService.markApplied(id, d.success);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }

  @Patch('update-status')
  updateStatusMany(@Body() data: UpdateJobsStatusDto) {
    return this.jobsService.updateStatusMany(data);
  }
}
