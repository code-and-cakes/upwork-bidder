import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { Location } from '../../automation/consts/locations.consts';
import { JobDuration } from '../../automation/types/job.types';

class BudgetUnit {
  @IsNumber()
  min: number;

  @IsNumber()
  @IsOptional()
  max?: number;
}

class Budget {
  @ValidateNested()
  @Type(() => BudgetUnit)
  hourly: BudgetUnit;

  @ValidateNested()
  @Type(() => BudgetUnit)
  fixed: BudgetUnit;
}

export class CreateSearchSuitDto {
  @IsString()
  name: string;

  @IsBoolean()
  active: boolean;

  @IsUUID()
  companyId: Id;

  @IsEnum(JobDuration, { each: true })
  duration: JobDuration[];

  @IsEnum(Location, { each: true })
  locations: Location[];

  @ValidateNested()
  @Type(() => Budget)
  budget: Budget;

  @IsString({ each: true })
  skills: string[];

  @IsString({ each: true })
  keywords: string[];

  @IsString({ each: true })
  excludeKeywords: string[];

  @IsBoolean()
  expert: boolean;
}
