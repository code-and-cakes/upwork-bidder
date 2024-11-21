import { Case as PrismaCase } from '@prisma/client';

export interface SheetCase {
  PROJECT: string;
  INDUSTRY: string;
  'CASE HEADLINE': string;
  'PROJECT HEADLINE': string;
  'CLIENT INFO': string;
  DETAILS: string;
  MARKET: string;
  'TEAM SIZE': string;
  DURATION: string;
  INVESTMENTS: string;
  'WHAT WE MADE?': string;
  OUTCOME: string;
  'PLANS -> REALITY': string;
  'USER FLOW': string;
  TESTIMONIAL: string;
  'SHORT NOTICE': string;
  OTHER: string;
  'TECH STACK KEYWORDS': string;
  'TECH STACK': string;
  SCREENSHOTS: string;
  'Link to Upwork': string;
}

export interface Case extends Omit<PrismaCase, 'data'> {
  data: SheetCase;
}
