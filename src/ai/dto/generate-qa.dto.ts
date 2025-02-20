import { Type } from 'class-transformer';
import { IsString, IsUUID, ValidateNested } from 'class-validator';

import { JobInfoDto } from './job-info.dto';

export class GenerateQaDto {
  @IsString()
  question: string;

  @ValidateNested()
  @Type(() => JobInfoDto)
  jobInfo: JobInfoDto;

  @IsUUID()
  companyId: Id;
}
