import { Module } from '@nestjs/common';

import { AccountsModule } from '../accounts/accounts.module';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
  imports: [AccountsModule],
})
export class JobsModule {}
