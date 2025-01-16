import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateSearchSuitDto {
  @IsString()
  link: string;

  @IsString()
  name: string;

  @IsBoolean()
  active: boolean;

  @IsUUID()
  companyId: Id;
}
