import { Injectable } from '@nestjs/common';

import { PrismaService } from '../global';
import { sendEmail } from '../global/lib/send-email';
import { QaService } from '../qa/qa.service';
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
    private readonly qaService: QaService,
  ) {
    super(db, 'Company');
  }

  async notifyConnections(id: Id) {
    const company = await this.findOne(id);

    const sixHoursAgo = new Date();
    sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);

    if (
      !company.lastNotifiedConnections ||
      company.lastNotifiedConnections < sixHoursAgo
    )
      await sendEmail({
        subject: 'Upwork Bidder. Out of Connections!',
        text: 'We are out of connections',
        to: process.env.NOTIFY_EMAIL,
        from: process.env.SENDER_EMAIL,
      });
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
    const company = (await this.db.company.create({
      data: {
        ...data,
        skills: {
          connect: await this.skillsService.getValidSkills(data.skills),
        },
      },
      include: {
        skills: true,
      },
    })) as any as Company;

    await this.qaService.create(company.id);

    return company;
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
