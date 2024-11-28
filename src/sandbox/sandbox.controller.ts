import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
}
