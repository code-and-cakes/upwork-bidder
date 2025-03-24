import { IsBoolean } from 'class-validator';

export class ApplyJobDto {
  @IsBoolean()
  success: boolean;
}
