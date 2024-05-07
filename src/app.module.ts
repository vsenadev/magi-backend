import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/Database.module';
import { AccountStatusModule } from './modules/AccountStatus.module';
import { UserTypeModule } from './modules/UserType.module';

@Module({
  imports: [DatabaseModule, AccountStatusModule, UserTypeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
