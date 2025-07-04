import { IsUUID } from 'class-validator';

export class GenerateClDto {
  @IsUUID()
  companyId: Id;

  @IsUUID()
  accountId: Id;

  @IsUUID()
  templateId: Id;

  @IsUUID()
  jobId: Id;
}
