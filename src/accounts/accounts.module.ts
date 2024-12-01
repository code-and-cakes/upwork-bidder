import { Module } from '@nestjs/common';

import { SkillsModule } from '../skills/skills.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  exports: [AccountsService],
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [SkillsModule],
})
export class AccountsModule {}
