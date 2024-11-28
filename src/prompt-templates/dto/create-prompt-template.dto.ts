import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreatePromptTemplateDto {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsBoolean()
  active: boolean;

  @IsUUID()
  companyId: string;
}
