import { Module } from '@nestjs/common';

import { SkillsModule } from '../skills/skills.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
  imports: [SkillsModule],
})
export class CompaniesModule {}
