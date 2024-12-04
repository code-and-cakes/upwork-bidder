import { PartialType } from '@nestjs/swagger';

import { CreateSearchSuitDto } from './create-search-suit.dto';

export class UpdateSearchSuitDto extends PartialType(CreateSearchSuitDto) {}
