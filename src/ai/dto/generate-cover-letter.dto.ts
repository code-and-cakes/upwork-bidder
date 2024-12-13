import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';

import { JobInfoDto } from './job-info.dto';

export class GenerateCoverLetterDto {
  @IsUUID()
  companyId: Id;

  @IsUUID()
  accountId: Id;

  @ValidateNested()
  @Type(() => JobInfoDto)
  jobInfo: JobInfoDto;
}
