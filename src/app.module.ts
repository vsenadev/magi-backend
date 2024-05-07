import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/Database.module';
import { AccountStatusModule } from './modules/AccountStatus.module';
import { ProductModule } from './modules/Product.module';

@Module({
  imports: [DatabaseModule, AccountStatusModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
