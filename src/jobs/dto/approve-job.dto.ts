import { IsBoolean } from 'class-validator';

export class ApproveJobDto {
  @IsBoolean()
  value: boolean;
}
