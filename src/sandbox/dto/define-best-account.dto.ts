import { IsUUID } from 'class-validator';

export class DefineBestAccountDto {
  @IsUUID()
  companyId: Id;

  @IsUUID()
  templateId: Id;

  @IsUUID()
  jobId: Id;
}
