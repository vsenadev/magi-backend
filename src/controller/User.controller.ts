import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { IMessage } from '../interface/Message.interface';
import { IUser, IUserWithStatusCode } from '../interface/User.interface';
import { UserService } from '../service/User.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('')
  createUser(@Body() body: IUser): Promise<IMessage> {
    return this.service.createUser(body);
  }

  @Get('')
  getAllUsers(): Promise<IUserWithStatusCode> {
    return this.service.getAllUsers();
  }

  @Put('/id/:_id')
  alterUser(@Param('_id') _id: string, @Body() body: IUser): Promise<IMessage> {
    return this.service.alterUser(_id, body);
  }

  @Put('/picture/:_id')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Param('_id') _id: string,
  ) {
    return this.service.uploadImage(_id, image);
  }

  @Delete('/id/:_id')
  deleteUser(@Param('_id') _id: string): Promise<IMessage> {
    return this.service.deleteUser(_id);
  }
}
