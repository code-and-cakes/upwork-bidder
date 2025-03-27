import { Type } from 'class-transformer';
import { IsBoolean, IsString, ValidateNested } from 'class-validator';

export class UpdateJobStatusDto {
  @IsString()
  link: string;

  @IsBoolean()
  viewed: boolean;

  @IsBoolean()
  answered: boolean;
}

export class UpdateJobsStatusDto {
  @ValidateNested({ each: true })
  @Type(() => UpdateJobStatusDto)
  jobs: UpdateJobStatusDto[];
}
