import { IsString, IsUUID } from 'class-validator';

export class AutomatedQaDto {
  @IsUUID()
  companyId: Id;

  @IsUUID()
  templateId: Id;

  @IsUUID()
  jobId: Id;

  @IsString()
  question: string;
}
