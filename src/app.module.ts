import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/Database.module';
import { AccountStatusModule } from './modules/AccountStatus.module';
import { UserTypeModule } from './modules/UserType.module';
import { ProductModule } from './modules/Product.module';
import { LockStatusModule } from './modules/LockStatus.module';
import { CompanyModule } from './modules/Company.module';
import { UserModule } from './modules/User.module';

@Module({
  imports: [
    DatabaseModule,
    AccountStatusModule,
    UserTypeModule,
    ProductModule,
    LockStatusModule,
    CompanyModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
