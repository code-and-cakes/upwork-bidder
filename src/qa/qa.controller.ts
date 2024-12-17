import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { QaDto } from './dto/qa.dto';
import { QaQueryDto } from './dto/qa-query.dto';
import { QaService } from './qa.service';

@ApiTags('QA')
@Controller('qa')
export class QaController {
  constructor(private readonly qaService: QaService) {}

  @Get()
  findAll(@Query() q: QaQueryDto) {
    return this.qaService.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: Id) {
    return this.qaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: Id, @Body() updateQaDto: QaDto) {
    return this.qaService.update(id, updateQaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Id) {
    return this.qaService.remove(id);
  }
}
