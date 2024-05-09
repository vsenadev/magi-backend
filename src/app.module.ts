import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/Database.module';
import { AccountStatusModule } from './modules/AccountStatus.module';
import { UserTypeModule } from './modules/UserType.module';
import { ProductModule } from './modules/Product.module';
import { LockStatusModule } from './modules/LockStatus.module';
import { ExpectedRouteModule } from './modules/ExpectedRoute.module';
import { TracedRouteModule } from './modules/TracedRoute.module';

@Module({
  imports: [DatabaseModule, AccountStatusModule, UserTypeModule, ProductModule, LockStatusModule, ExpectedRouteModule, TracedRouteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
