import { Module } from '@nestjs/common';

import { QaModule } from '../qa/qa.module';
import { SkillsModule } from '../skills/skills.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
  imports: [SkillsModule, QaModule],
})
export class CompaniesModule {}
