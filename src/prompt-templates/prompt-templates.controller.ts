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

import { CreatePromptTemplateDto } from './dto/create-prompt-template.dto';
import { UpdatePromptTemplateDto } from './dto/update-prompt-template.dto';
import { PromptTemplatesService } from './prompt-templates.service';

@ApiTags('Prompt Templates')
@Controller('prompt-templates')
export class PromptTemplatesController {
  constructor(
    private readonly promptTemplatesService: PromptTemplatesService,
  ) {}

  @Post()
  create(@Body() createPromptTemplateDto: CreatePromptTemplateDto) {
    return this.promptTemplatesService.create(createPromptTemplateDto);
  }

  @Get()
  findAll() {
    return this.promptTemplatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Id) {
    return this.promptTemplatesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Id,
    @Body() updatePromptTemplateDto: UpdatePromptTemplateDto,
  ) {
    return this.promptTemplatesService.update(id, updatePromptTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Id) {
    return this.promptTemplatesService.remove(id);
  }
}
