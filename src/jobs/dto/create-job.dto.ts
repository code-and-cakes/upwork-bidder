import { Type } from 'class-transformer';
import { IsEmpty, IsString, ValidateNested } from 'class-validator';

class JobData {
  @IsString({ each: true })
  skills: string[];

  @IsString()
  description: string;
}

class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  link: string;

  @IsString()
  postedAt: Date;

  @ValidateNested()
  @Type(() => JobData)
  data: JobData;

  @IsEmpty()
  accountId: Id;

  @IsEmpty()
  companyId: Id;
}

export class CreateJobsDto {
  @ValidateNested({ each: true })
  @Type(() => CreateJobDto)
  jobs: CreateJobDto[];
}
