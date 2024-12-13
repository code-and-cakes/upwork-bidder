import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

import {
  Budget,
  ClientInfo,
  JobDuration,
  JobInfo,
} from '../../automation/types/job.types';

export class JobInfoDto implements JobInfo {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  duration: JobDuration;

  @IsObject()
  budget: Budget;

  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @IsObject()
  client: ClientInfo;

  @IsBoolean()
  @IsOptional()
  more30Hr?: boolean;

  @IsString({ each: true })
  questions: string[];
}
