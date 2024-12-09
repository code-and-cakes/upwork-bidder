import { Injectable } from '@nestjs/common';
import { PromptTemplate } from '@prisma/client';

import { PrismaService } from '../global';
import { AbstractCrudService } from '../shared/classes/abstract-crud.service';
import { PromptTemplatesQueryDto } from './dto/prompt-templates-query.dto';

@Injectable()
export class PromptTemplatesService extends AbstractCrudService<PromptTemplate> {
  constructor(private readonly db: PrismaService) {
    super(db, 'PromptTemplate');
  }

  findActive(
    companyId: Id,
    type: PromptTemplate['type'],
  ): Promise<PromptTemplate> {
    return this.db.promptTemplate.findFirst({
      where: {
        active: true,
        companyId: companyId,
        type: type,
      },
    });
  }

  findMany(q: PromptTemplatesQueryDto) {
    return this.db.promptTemplate.findMany({
      where: q,
    });
  }
}
