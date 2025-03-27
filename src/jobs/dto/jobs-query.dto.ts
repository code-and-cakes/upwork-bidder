import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator';

import { Bool } from '../../shared/consts/common.consts';
import { PageOptionsDto } from '../../shared/dto/page-options.dto';

export enum JobStatus {
  VIEWED = 'viewed',
  ANSWERED = 'answered',
  APPLIED = 'applied',
}

export class JobsQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({ type: 'string', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  accountId?: Id;

  @ApiPropertyOptional({ enum: Bool })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  approved?: boolean;

  @ApiPropertyOptional({ enum: Bool })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  success?: boolean;

  @ApiPropertyOptional({ enum: Bool })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  applied?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  companyId?: Id;

  @ApiPropertyOptional({ type: 'number' })
  @IsOptional()
  approvePercentage?: number;

  @ApiPropertyOptional({ enum: JobStatus, enumName: 'JobStatus' })
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;
}
