import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';

import { AbstractCrudService } from '../cases/abstract-crud.service';
import { PrismaService } from '../global';

@Injectable()
export class AccountsService extends AbstractCrudService<Account> {
  constructor(private db: PrismaService) {
    super(db, 'Account');
  }
}
