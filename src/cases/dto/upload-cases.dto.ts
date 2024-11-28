import { IsUUID } from 'class-validator';

export class UploadCasesDto {
  @IsUUID()
  companyId: string;
}
