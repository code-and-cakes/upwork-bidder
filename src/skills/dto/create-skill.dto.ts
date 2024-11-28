import { IsString } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
