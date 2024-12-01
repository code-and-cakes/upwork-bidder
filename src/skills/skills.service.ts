import { Injectable } from '@nestjs/common';
import { Skill } from '@prisma/client';

import { PrismaService } from '../global';

@Injectable()
export class SkillsService {
  constructor(private db: PrismaService) {}

  create(d: Skill) {
    return this.db.skill.create({ data: d });
  }

  findAll() {
    return this.db.skill.findMany();
  }

  findManyByIds(ids: Id[]) {
    return this.db.skill.findMany({ where: { id: { in: ids } } });
  }

  findById(id: Id) {
    return this.db.skill.findUnique({ where: { id } });
  }

  findByName(name: string) {
    return this.db.skill.findUnique({ where: { name } });
  }

  remove(id: Id) {
    return this.db.skill.delete({ where: { id } });
  }

  async getValidSkills(skillIds: Id[]) {
    const skills = await this.findManyByIds(skillIds);

    return skills.map((skill) => ({
      id: skill.id,
    }));
  }
}
