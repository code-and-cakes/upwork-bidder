import { IsUUID } from 'class-validator';

export class AutomatedApproveJobDto {
  @IsUUID()
  companyId: Id;

  @IsUUID()
  templateId: Id;

  @IsUUID()
  jobId: Id;
}
