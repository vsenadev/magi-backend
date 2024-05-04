import { Body, Controller, Post } from '@nestjs/common';
import { AccountStatusService } from '../service/AccountStatus.service';
import { IMessage } from '../interface/Message.interface';
import { IAccountStatusInterface } from '../interface/AccountStatus.interface';

@Controller('api/accountstatus')
export class AccountStatusController {
  constructor(private readonly service: AccountStatusService) {}

  @Post('')
  createStatus(@Body() body: IAccountStatusInterface): Promise<IMessage> {
    return this.service.createStatus(body);
  }
}
