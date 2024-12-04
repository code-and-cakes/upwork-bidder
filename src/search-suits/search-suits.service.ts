import { Injectable } from '@nestjs/common';

import { PrismaService } from '../global';
import { CreateSearchSuitDto } from './dto/create-search-suit.dto';
import { UpdateSearchSuitDto } from './dto/update-search-suit.dto';
import { SearchSuit } from './types/search-suit.types';

@Injectable()
export class SearchSuitsService {
  constructor(private readonly db: PrismaService) {}

  create(d: CreateSearchSuitDto): Promise<SearchSuit> {
    const data: Dto<SearchSuit> = {
      name: d.name,
      active: d.active,
      companyId: d.companyId,
      value: {
        budget: d.budget,
        duration: d.duration,
        skills: d.skills,
        keywords: d.keywords,
        paymentVerified: true,
        locations: d.locations,
      },
    };

    return this.db.searchSuit.create({ data: data as any }) as any;
  }

  async update(id: Id, d: UpdateSearchSuitDto): Promise<SearchSuit> {
    const searchSuit = await this.findOne(id);

    const data: UpdateDto<SearchSuit> = {
      name: d.name ?? searchSuit.name,
      active: d.active ?? searchSuit.active,
      value: {
        budget: d.budget ?? searchSuit.value.budget,
        duration: d.duration,
        skills: d.skills,
        keywords: d.keywords,
        paymentVerified: true,
        locations: d.locations,
      },
    };

    return this.db.searchSuit.update({
      where: { id },
      data: data as any,
    }) as any;
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
