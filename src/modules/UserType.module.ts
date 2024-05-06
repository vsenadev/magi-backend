import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTypeModelName, UserTypeSchema } from '../schema/UserType.schema';
import { UserTypeController } from '../controller/UserType.controller';
import { UserTypeService } from '../service/UserType.service';
import { UserTypeRepository } from '../repository/UsertType.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserTypeModelName, schema: UserTypeSchema },
    ]),
  ],
  controllers: [UserTypeController],
  providers: [UserTypeService, UserTypeRepository],
})
export class UserTypeModule {}
