import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ClientInfoForApproveJob {
  @IsOptional()
  @IsString()
  clientCountry?: string;

  @IsOptional()
  @IsString()
  clientCity?: string;

  @IsOptional()
  @IsString()
  clientCompanyDomain?: string;

  @IsOptional()
  @IsString()
  clientCompanySize?: string;

  @IsOptional()
  @IsNumber()
  clientRating?: number;

  @IsOptional()
  @IsBoolean()
  clientPaymentVerified?: boolean;

  @IsOptional()
  @IsString()
  clientJobsPostedNumber?: string;

  @IsOptional()
  @IsString()
  clientHireRate?: string;

  @IsOptional()
  @IsString()
  clientOpenJobs?: string;

  @IsOptional()
  @IsString()
  clientTotalHires?: string;

  @IsOptional()
  @IsString()
  clientTotalSpentNumber?: string;

  @IsOptional()
  @IsString()
  clientActiveHires?: string;

  @IsOptional()
  @IsString()
  clientHourlyRateNumber?: string;

  @IsOptional()
  @IsString()
  clientTotalHoursNumber?: string;
}

class JobData {
  @IsString({ each: true })
  skills: string[];

  @IsString()
  description: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ClientInfoForApproveJob)
  client?: ClientInfoForApproveJob;
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
}

export class CreateJobsDto {
  @ValidateNested({ each: true })
  @Type(() => CreateJobDto)
  jobs: CreateJobDto[];
}
