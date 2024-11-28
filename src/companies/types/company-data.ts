import { Company as PrismaCompany } from '@prisma/client';

export interface Company extends Omit<PrismaCompany, 'services'> {
  services: { name: string; description: string }[];
}
