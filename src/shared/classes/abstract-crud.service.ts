import { Prisma, PrismaClient } from '@prisma/client';

const includeAllRelations = (modelName: string, schema: any) => {
  const modelRelations = schema.models[modelName]?.relations || [];
  const include = {};
  modelRelations.forEach((relation) => {
    include[relation.name] = true;
  });
  return include;
};

export abstract class AbstractCrudService<
  T extends { id: Id; createdAt: Date; updatedAt: Date },
> {
  protected constructor(
    protected readonly prisma: PrismaClient, // Inject Prisma Client
    protected readonly model: Prisma.ModelName,
  ) {}

  async findOne(id: Id): Promise<T | null> {
    try {
      return this.prisma[this.model].findUniqueOrThrow({
        where: { id },
        include: includeAllRelations(this.model, this.prisma),
      }) as Promise<T | null>;
    } catch (e) {
      throw new Error(`Couldn't find ${this.model} with id: ${id}`);
    }
  }

  async findAll(): Promise<T[]> {
    try {
      return this.prisma[this.model].findMany() as Promise<T[]>;
    } catch (e) {
      throw new Error(`Couldn't query ${this.model} collection`);
    }
  }

  async create(data: Dto<T>): Promise<T> {
    try {
      return this.prisma[this.model].create({
        data,
      }) as Promise<T>;
    } catch (e) {
      throw new Error(`Could not create ${this.model}`);
    }
  }

  async update(id: Id, data: Partial<Dto<T>>): Promise<T> {
    try {
      return this.prisma[this.model].update({
        where: { id },
        data,
      }) as Promise<T>;
    } catch (e) {
      throw new Error(`Could not update ${this.model} with id: ${id}`);
    }
  }

  async remove(id: Id): Promise<T> {
    try {
      return this.prisma[this.model].delete({
        where: { id },
      }) as Promise<T>;
    } catch (e) {
      throw new Error(`Could not delete ${this.model} with id: ${id}`);
    }
  }
}
