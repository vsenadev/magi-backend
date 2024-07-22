import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelName, UserSchema } from '../schema/User.schema';
import { UserController } from '../controller/User.controller';
import { UserService } from '../service/User.service';
import { UserRepository } from '../repository/User.repository';
import { CompanyRepository } from '../repository/Company.repository';
import { CompanyModelName, CompanySchema } from '../schema/Company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModelName, schema: UserSchema },
      { name: CompanyModelName, schema: CompanySchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, CompanyRepository],
})
export class UserModule {}
