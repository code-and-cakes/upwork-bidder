import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class JobsQueryDto {
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
}
