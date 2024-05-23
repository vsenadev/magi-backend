import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LockStatusController } from '../controller/LockStatus.controller';
import { LockStatusService } from '../service/LockStatus.service';
import {
  LockStatusSchema,
  LockStatusModelName,
} from '../schema/LockStatus.schema';
import { LockStatusRepository } from '../repository/LockStatus.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LockStatusModelName, schema: LockStatusSchema },
    ]),
  ],
  controllers: [LockStatusController],
  providers: [LockStatusService, LockStatusRepository],
})
export class LockStatusModule {}
