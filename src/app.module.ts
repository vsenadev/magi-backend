import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/Database.module';
import { AccountStatusModule } from './modules/AccountStatus.module';

@Module({
  imports: [DatabaseModule, AccountStatusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
