import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CompanyService } from './company.service';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
}
