import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';

import { PrismaService } from '../global';
import { AbstractCrudService } from '../shared/classes/abstract-crud.service';
import { SkillsService } from '../skills/skills.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService extends AbstractCrudService<Account> {
  constructor(
    private db: PrismaService,
    private readonly skillsService: SkillsService,
  ) {
    super(db, 'Account');
  }

  findAll(companyId?: Id) {
    return this.db.account.findMany({
      where: {
        companyId,
      },
      include: {
        skills: true,
      },
    });
  }

  findOne(id: Id) {
    return this.db.account.findUnique({
      where: {
        id,
      },
      include: {
        skills: true,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.db.account.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: CreateAccountDto) {
    return this.db.account.create({
      data: {
        ...data,
        skills: {
          connect: await this.skillsService.getValidSkills(data.skills),
        },
      },
      include: {
        skills: true,
      },
    });
  }

  async update(id: Id, data: UpdateAccountDto) {
    return this.db.account.update({
      where: {
        id,
      },
      data: {
        ...data,
        skills: {
          set: await this.skillsService.getValidSkills(data.skills),
        },
      },
      include: {
        skills: true,
      },
    });
  }
}
