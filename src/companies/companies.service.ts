import { Injectable } from '@nestjs/common';

import { PrismaService } from '../global';
import { AbstractCrudService } from '../shared/classes/abstract-crud.service';
import { SkillsService } from '../skills/skills.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './types/company-data';

@Injectable()
export class CompaniesService extends AbstractCrudService<Company> {
  constructor(
    private readonly db: PrismaService,
    private readonly skillsService: SkillsService,
  ) {
    super(db, 'Company');
  }

  async findAll() {
    return this.db.company.findMany({
      include: {
        skills: true,
      },
    }) as any as Promise<Company[]>;
  }

  findOne(id: Id) {
    return this.db.company.findUnique({
      where: {
        id,
      },
      include: {
        skills: true,
      },
    }) as any as Promise<Company>;
  }

  async create(data: CreateCompanyDto) {
    return this.db.company.create({
      data: {
        ...data,
        skills: {
          connect: await this.skillsService.getValidSkills(data.skills),
        },
      },
      include: {
        skills: true,
      },
    }) as any as Promise<Company>;
  }

  async update(id: Id, data: UpdateCompanyDto) {
    return this.db.company.update({
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
    }) as any as Promise<Company>;
  }
}
