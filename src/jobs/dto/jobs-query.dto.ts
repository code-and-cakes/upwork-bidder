import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

import { PageOptionsDto } from '../../shared/dto/page-options.dto';

export class JobsQueryDto extends PageOptionsDto {
  @IsOptional()
  @IsUUID()
  accountId?: Id;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  approved?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  applied?: boolean;

  @IsOptional()
  @IsUUID()
  companyId?: Id;
}
