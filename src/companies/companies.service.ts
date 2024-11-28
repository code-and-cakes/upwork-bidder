import { Injectable } from '@nestjs/common';

import { PrismaService } from '../global';
import { AbstractCrudService } from '../shared/classes/abstract-crud.service';
import { Company } from './types/company-data';

@Injectable()
export class CompaniesService extends AbstractCrudService<Company> {
  constructor(private readonly db: PrismaService) {
    super(db, 'Company');
  }
}
