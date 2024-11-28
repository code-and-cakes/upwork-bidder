import { IsString, IsUUID } from 'class-validator';

export class GenerateClDto {
  @IsUUID()
  companyId: Id;

  @IsUUID()
  accountId: Id;

  @IsUUID()
  templateId: Id;

  @IsString()
  jobName: string;

  @IsString()
  jobDescription: string;

  @IsString()
  jobDomain: string;

  @IsString()
  skills: string;
}
