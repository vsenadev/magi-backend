import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelName, UserSchema } from '../schema/User.schema';
import { UserController } from '../controller/User.controller';
import { UserService } from '../service/User.service';
import { UserRepository } from '../repository/User.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModelName, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
