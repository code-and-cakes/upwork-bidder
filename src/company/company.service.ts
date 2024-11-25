import { Injectable } from '@nestjs/common';

import { AbstractCrudService } from '../cases/abstract-crud.service';
import { PrismaService } from '../global';
import { CompanyData } from './types/company-data';

@Injectable()
export class CompanyService extends AbstractCrudService<CompanyData> {
  constructor(private readonly db: PrismaService) {
    super(db, 'CompanyData');
  }

  async getInfo() {
    const [companyInfo] = await this.findAll();
    return companyInfo;
  }
}
