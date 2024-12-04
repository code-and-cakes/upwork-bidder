import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateSearchSuitDto } from './dto/create-search-suit.dto';
import { UpdateSearchSuitDto } from './dto/update-search-suit.dto';
import { SearchSuitsService } from './search-suits.service';

@ApiTags('Search Suits')
@Controller('search-suits')
export class SearchSuitsController {
  constructor(private readonly searchSuitsService: SearchSuitsService) {}

  @Post()
  create(@Body() createSearchSuitDto: CreateSearchSuitDto) {
    return this.searchSuitsService.create(createSearchSuitDto);
  }

  @Get('company/:id')
  findManyByCompany(@Param('id') id: Id) {
    return this.searchSuitsService.findManyByCompany(id);
  }

  @Get(':id')
  findOne(@Param('id') id: Id) {
    return this.searchSuitsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Id,
    @Body() updateSearchSuitDto: UpdateSearchSuitDto,
  ) {
    return this.searchSuitsService.update(id, updateSearchSuitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchSuitsService.remove(id);
  }
}
