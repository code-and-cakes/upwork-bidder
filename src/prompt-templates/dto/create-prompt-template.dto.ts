import { OpenAIModel, PromptType } from '@prisma/client';
import { IsBoolean, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

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

  @IsNumber()
  temperature: number;

  @IsEnum(OpenAIModel)
  model: OpenAIModel;
}
