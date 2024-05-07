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
import { IMessage } from '../interface/Message.interface';
import {
  IAccountStatus,
  IAccountStatusWithStatusCode,
} from '../interface/AccountStatus.interface';

@Controller('api/accountstatus')
export class AccountStatusController {
  constructor(private readonly service: AccountStatusService) {}

  @Post('')
  createAccountStatus(@Body() body: IAccountStatus): Promise<IMessage> {
    return this.service.createAccountStatus(body);
  }

  @Get('')
  getAllAccountStatus(): Promise<IAccountStatusWithStatusCode> {
    return this.service.getAllAccountStatus();
  }

  @Put('/code/:code')
  alterAccountStatus(
    @Param('code') code: number,
    @Body() body: IAccountStatus,
  ): Promise<IMessage> {
    return this.service.alterAccountStatus(code, body);
  }

  @Delete('/code/:code')
  deleteAccountStatus(@Param('code') code: number): Promise<IMessage> {
    return this.service.deleteAccountStatus(code);
  }
}
