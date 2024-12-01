import { IsArray, IsString } from 'class-validator';

import { Company } from '../types/company-data';

export class CreateCompanyDto implements Dto<Company> {
  @IsString()
  name: string;

  @IsString()
  moto: string;

  @IsString()
  overview: string;

  @IsString({ each: true })
  skills: Id[];

  @IsString()
  website: string;

  @IsArray()
  services: { name: string; description: string }[];
}
