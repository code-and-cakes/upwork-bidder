import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

import { Bool } from '../../shared/consts/common.consts';
import { PageOptionsDto } from '../../shared/dto/page-options.dto';

export class JobsQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({ type: 'string', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  accountId?: Id;

  @ApiPropertyOptional({ enum: Bool })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  approved?: boolean;

  @ApiPropertyOptional({ enum: Bool })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  success?: boolean;

  @ApiPropertyOptional({ enum: Bool })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  applied?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  companyId?: Id;
}
