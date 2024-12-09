import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DefineBestAccountDto } from './dto/define-best-account.dto';
import { DefineBestCasesDto } from './dto/define-best-cases.dto';
import { GenerateClDto } from './dto/generate-cl.dto';
import { SandboxService } from './sandbox.service';

@ApiTags('Sandbox')
@Controller('sandbox')
export class SandboxController {
  constructor(private readonly sandboxService: SandboxService) {}

  @Post('cover-letter')
  generateCL(@Body() d: GenerateClDto) {
    return this.sandboxService.generateCL(d);
  }

  @Post('select-cases')
  defineBestCases(@Body() d: DefineBestCasesDto) {
    return this.sandboxService.defineBestCases(d);
  }

  @Post('select-account')
  defineBestAccount(@Body() d: DefineBestAccountDto) {
    return this.sandboxService.defineBestAccount(d);
  }
}
