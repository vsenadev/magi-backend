import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/Database.module';
import { AccountStatusModule } from './modules/AccountStatus.module';
import { UserTypeModule } from './modules/UserType.module';
import { ProductModule } from './modules/Product.module';

@Module({
  imports: [DatabaseModule, AccountStatusModule, UserTypeModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
