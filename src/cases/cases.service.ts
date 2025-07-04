import { Injectable } from '@nestjs/common';

import { PrismaService } from '../global';
import { AbstractCrudService } from '../shared/classes/abstract-crud.service';
import { CasesQueryDto } from './dto/cases-query.dto';
import { Case, SheetCase } from './types/case.types';

@Injectable()
export class CasesService extends AbstractCrudService<Case> {
  constructor(private readonly db: PrismaService) {
    super(db, 'Case');
  }

  async upload(companyId: Id, cases: SheetCase[]): Promise<Case[]> {
    await this.db.case.deleteMany({ where: { companyId } });

    const duplicates = cases.filter(
      (c, i) => cases.findIndex((c2) => c2.PROJECT === c.PROJECT) !== i,
    );

    console.log('Duplicates:', duplicates);

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

  async findMany(d: CasesQueryDto): Promise<Case[]> {
    return this.db.case.findMany({
      where: d,
    }) as any;
  }
}
