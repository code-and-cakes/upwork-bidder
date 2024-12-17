import { Injectable } from '@nestjs/common';

import { PrismaService } from '../global';
import { QaDto } from './dto/qa.dto';
import { QaQueryDto } from './dto/qa-query.dto';
import { getDefaultQuestions } from './lib/getDefaultQuestions';

@Injectable()
export class QaService {
  constructor(private db: PrismaService) {}

  async create(companyId: Id) {
    return this.db.qA
      .create({
        data: {
          data: getDefaultQuestions(),
          companyId,
        },
      })
      .catch((e) => {
        console.error(e.message);
        throw new Error('Failed to create QA');
      });
  }

  async findAll(q: QaQueryDto) {
    return this.db.qA.findMany({
      where: {
        companyId: q.companyId,
      },
    });
  }

  async findOne(id: Id) {
    return this.db.qA
      .findUnique({
        where: { id },
      })
      .catch((e) => {
        console.error(e.message);
        throw new Error('Failed to find QA');
      });
  }

  async update(id: Id, updateQaDto: QaDto) {
    return this.db.qA
      .update({
        where: { id },
        data: {
          data: updateQaDto.data as any,
        },
      })
      .catch((e) => {
        console.error(e.message);
        throw new Error('Failed to update QA');
      });
  }

  async remove(id: Id) {
    return this.db.qA
      .delete({
        where: { id },
      })
      .catch((e) => {
        console.error(e.message);
        throw new Error('Failed to delete QA');
      });
  }
}
