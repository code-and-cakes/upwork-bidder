import { QA as PrismaQA } from '.prisma/client';

export interface QA extends Omit<PrismaQA, 'data'> {
  data: Record<string, string>;
}
