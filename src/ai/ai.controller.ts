import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AIService } from './ai.service';
import { GenerateCoverLetterDto } from './dto/generate-cover-letter.dto';
import { GenerateQaDto } from './dto/generate-qa.dto';

@ApiTags('AI')
@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('cover-letter')
  generateCoverLetter(@Body() d: GenerateCoverLetterDto) {
    return this.aiService.generateCoverLetter(d);
  }

  @Post('qa')
  generateQA(@Body() d: GenerateQaDto) {
    return this.aiService.generateQA(d);
  }
}
