import { Injectable } from '@nestjs/common';

import { PrismaService } from '../global';
import { AbstractCrudService } from '../shared/classes/abstract-crud.service';
import { Case, SheetCase } from './types/case.types';

@Injectable()
export class CasesService extends AbstractCrudService<Case> {
  constructor(private readonly db: PrismaService) {
    super(db, 'Case');
  }

  async upload(companyId: Id, cases: SheetCase[]): Promise<Case[]> {
    await this.db.case.deleteMany();
    await this.db.case.createMany({
      data: cases.map((c) => ({
        name: c.PROJECT,
        description: c.DETAILS,
        duration: c.DURATION,
        industry: c.INDUSTRY,
        market: c.MARKET,
        data: c as any,
        companyId,
      })),
    });
    return this.findAll();
  }
}
