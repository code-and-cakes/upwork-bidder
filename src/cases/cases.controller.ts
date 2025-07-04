import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FileUpload } from '../shared/decorators/uploadFile';
import { parseCSV } from '../shared/lib/parseCSV';
import { CasesService } from './cases.service';
import { CasesQueryDto } from './dto/cases-query.dto';
import { UploadCasesDto } from './dto/upload-cases.dto';
import { Case, SheetCase } from './types/case.types';

@ApiTags('Cases')
@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post('upload')
  @FileUpload('CSV', { companyId: { type: 'string', format: '' } })
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() d: UploadCasesDto,
  ): Promise<Case[]> {
    const cases = await parseCSV<SheetCase>(file.buffer);

    return this.casesService.upload(d.companyId, cases);
  }

  @Get()
  findAll(@Query() q: CasesQueryDto) {
    return this.casesService.findMany(q);
  }

  @Get(':id')
  findOne(@Param('id') id: Id) {
    return this.casesService.findOne(id);
  }
}
