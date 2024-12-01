import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';

import { PrismaService } from '../global';
import { AbstractCrudService } from '../shared/classes/abstract-crud.service';

@Injectable()
export class AccountsService extends AbstractCrudService<Account> {
  constructor(private db: PrismaService) {
    super(db, 'Account');
  }

  findAll(companyId?: string) {
    return this.db.account.findMany({
      where: {
        companyId,
      },
      include: {
        skills: true,
      },
    });
  }

  findOne(id: string) {
    return this.db.account.findUnique({
      where: {
        id,
      },
      include: {
        skills: true,
      },
    });
  }
}
