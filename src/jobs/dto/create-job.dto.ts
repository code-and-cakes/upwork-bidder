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
  @IsNumber()
  clientJobsPostedNumber?: number;

  @IsOptional()
  @IsNumber()
  clientHireRate?: number;

  @IsOptional()
  @IsNumber()
  clientOpenJobs?: number;

  @IsOptional()
  @IsNumber()
  clientTotalHires?: number;

  @IsOptional()
  @IsNumber()
  clientTotalSpentNumber?: number;

  @IsOptional()
  @IsNumber()
  clientActiveHires?: number;

  @IsOptional()
  @IsNumber()
  clientHourlyRateNumber?: number;

  @IsOptional()
  @IsNumber()
  clientTotalHoursNumber?: number;
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
