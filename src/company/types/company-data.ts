import { CompanyData as PrismaCompanyData } from '@prisma/client';

export interface CompanyData extends Omit<PrismaCompanyData, 'services'> {
  services: { name: string; description: string }[];
}
