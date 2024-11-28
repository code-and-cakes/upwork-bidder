import { Injectable } from '@nestjs/common';
import { PromptTemplate } from '@prisma/client';

import { PrismaService } from '../global';
import { AbstractCrudService } from '../shared/classes/abstract-crud.service';

@Injectable()
export class PromptTemplatesService extends AbstractCrudService<PromptTemplate> {
  constructor(private readonly db: PrismaService) {
    super(db, 'PromptTemplate');
  }
}
