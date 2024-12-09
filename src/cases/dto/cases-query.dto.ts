import { IsOptional, IsUUID } from 'class-validator';

export class CasesQueryDto {
  @IsOptional()
  @IsUUID()
  companyId?: Id;
}
