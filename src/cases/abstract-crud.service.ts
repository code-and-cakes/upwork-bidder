import { Prisma, PrismaClient } from '@prisma/client';

export abstract class AbstractCrudService<
  T extends { id: Id; createdAt: Date; updatedAt: Date },
> {
  protected constructor(
    protected readonly prisma: PrismaClient, // Inject Prisma Client
    protected readonly model: Prisma.ModelName,
  ) {}

  async findOne(id: Id): Promise<T | null> {
    return this.prisma[this.model].findUnique({
      where: { id },
    }) as Promise<T | null>;
  }

  async findAll(): Promise<T[]> {
    return this.prisma[this.model].findMany() as Promise<T[]>;
  }

  async create(data: Dto<T>): Promise<T> {
    return this.prisma[this.model].create({
      data,
    }) as Promise<T>;
  }

  async update(id: number, data: Partial<Omit<T, 'id'>>): Promise<T> {
    return this.prisma[this.model].update({
      where: { id },
      data,
    }) as Promise<T>;
  }

  async remove(id: number): Promise<T> {
    return this.prisma[this.model].delete({
      where: { id },
    }) as Promise<T>;
  }
}
