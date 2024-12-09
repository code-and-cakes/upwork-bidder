import { PromptType } from '@prisma/client';
import { IsBoolean, IsEnum, IsString, IsUUID } from 'class-validator';

export class CreatePromptTemplateDto {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsEnum(PromptType)
  type: PromptType;

  @IsBoolean()
  active: boolean;

  @IsUUID()
  companyId: string;
}
