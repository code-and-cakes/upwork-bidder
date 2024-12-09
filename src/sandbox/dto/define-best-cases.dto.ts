import { IsUUID } from 'class-validator';

export class DefineBestCasesDto {
  @IsUUID()
  companyId: Id;

  @IsUUID()
  templateId: Id;

  @IsUUID()
  jobId: Id;
}
