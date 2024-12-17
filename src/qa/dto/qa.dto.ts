import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class QA {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}

export class QaDto {
  @ValidateNested({ each: true })
  @Type(() => QA)
  data: QA[];
}
