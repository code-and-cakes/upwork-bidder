import { Module } from '@nestjs/common';

import { SearchSuitsController } from './search-suits.controller';
import { SearchSuitsService } from './search-suits.service';

@Module({
  controllers: [SearchSuitsController],
  providers: [SearchSuitsService],
})
export class SearchSuitsModule {}
