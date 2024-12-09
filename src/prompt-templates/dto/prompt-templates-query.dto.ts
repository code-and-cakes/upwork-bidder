import { PromptType } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class PromptTemplatesQueryDto {
  @IsOptional()
  @IsUUID()
  companyId?: Id;

  @IsOptional()
  @IsEnum(PromptType)
  type: PromptType;
}
