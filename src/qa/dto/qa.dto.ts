import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class QA {
  question: string;
  answer: string;
}

export class QaDto {
  @ValidateNested({ each: true })
  @Type(() => QA)
  data: QA[];
}
