import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from './database/Database.module';
import { AccountStatusModule } from './modules/AccountStatus.module';
import { UserTypeModule } from './modules/UserType.module';
import { ProductModule } from './modules/Product.module';
import { LockStatusModule } from './modules/LockStatus.module';
import { DeliveryModule } from './modules/Delivery.module';
import { CompanyModule } from './modules/Company.module';
import { UserModule } from './modules/User.module';
import { AuthModule } from './modules/Auth.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    DatabaseModule,
    AccountStatusModule,
    UserTypeModule,
    ProductModule,
    LockStatusModule,
    DeliveryModule,
    CompanyModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
