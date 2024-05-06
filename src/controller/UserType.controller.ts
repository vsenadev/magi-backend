import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AccountStatusService } from '../service/AccountStatus.service';
import {
  IAccountStatus,
  IAccountStatusWithStatusCode,
} from '../interface/AccountStatus.interface';
import { IMessage } from '../interface/Message.interface';
import {
  IUserType,
  IUserTypeWithStatusCode,
} from '../interface/UserType.interface';
import { UserTypeService } from '../service/UserType.service';

@Controller('api/usertype')
export class UserTypeController {
  constructor(private readonly service: UserTypeService) {}

  @Post('')
  createUserType(@Body() body: IUserType): Promise<IMessage> {
    return this.service.createUserType(body);
  }

  @Get('')
  getAllUserType(): Promise<IUserTypeWithStatusCode> {
    return this.service.getAllUserType();
  }

  @Put('/code/:code')
  alterUserType(
    @Param('code') code: number,
    @Body() body: IUserType,
  ): Promise<IMessage> {
    return this.service.alterUserType(code, body);
  }

  @Delete('/code/:code')
  deleteUserType(@Param('code') code: number): Promise<IMessage> {
    return this.service.deleteUserType(code);
  }
}
