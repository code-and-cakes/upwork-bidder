import { Injectable } from '@nestjs/common';
import { SearchSuit } from '@prisma/client';

import { PrismaService } from '../global';
import { CreateSearchSuitDto } from './dto/create-search-suit.dto';
import { UpdateSearchSuitDto } from './dto/update-search-suit.dto';

@Injectable()
export class SearchSuitsService {
  constructor(private readonly db: PrismaService) {}

  create(d: CreateSearchSuitDto): Promise<SearchSuit> {
    return this.db.searchSuit.create({
      data: {
        name: d.name,
        active: d.active,
        companyId: d.companyId,
        link: d.link,
      },
    });
  }

  async update(id: Id, d: UpdateSearchSuitDto): Promise<SearchSuit> {
    const searchSuit = await this.findOne(id);

    return this.db.searchSuit.update({
      where: { id },
      data: {
        name: d.name ?? searchSuit.name,
        active: d.active ?? searchSuit.active,
        link: d.link ?? searchSuit.link,
      },
    });
  }

  findManyByCompany(companyId: Id): Promise<SearchSuit[]> {
    return this.db.searchSuit.findMany({ where: { companyId } }) as any;
  }

  findOne(id: Id): Promise<SearchSuit> {
    return this.db.searchSuit.findUnique({ where: { id } }) as any;
  }

  remove(id: Id) {
    return this.db.searchSuit.delete({ where: { id } });
  }
}
