import { Controller, Get, Post, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FileUpload } from '../shared/decorators/uploadFile';
import { parseCSV } from '../shared/lib/parseCSV';
import { CasesService } from './cases.service';
import { Case, SheetCase } from './types/case.types';

@ApiTags('Cases')
@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post('upload')
  @FileUpload('CSV')
  async upload(@UploadedFile() file: Express.Multer.File): Promise<Case[]> {
    const res = await parseCSV<SheetCase>(file.buffer);
    return this.casesService.upload(res);
  }

  @Get()
  findAll() {
    return this.casesService.findAll();
  }
}
