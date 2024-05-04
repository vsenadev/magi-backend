import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountStatusController } from '../controller/AccountStatus.controller';
import { AccountStatusService } from '../service/AccountStatus.service';
import {
  AccountStatusSchema,
  AccountStatusModelName,
} from '../schema/AccountStatus.schema';
import { AccountStatusRepository } from '../repository/AccountStatus.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountStatusModelName, schema: AccountStatusSchema },
    ]),
  ],
  controllers: [AccountStatusController],
  providers: [AccountStatusService, AccountStatusRepository],
})
export class AccountStatusModule {}
