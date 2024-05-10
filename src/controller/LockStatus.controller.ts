import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { LockStatusService } from '../service/LockStatus.service';
import { IMessage } from '../interface/Message.interface';
import { ILockStatus } from '../interface/LockStatus.interface';

@Controller('api/lockstatus')
export class LockStatusController {
  constructor(private readonly service: LockStatusService) {}

  @Post('')
  createLockStatus(@Body() body: ILockStatus): Promise<IMessage> {
    return this.service.createLockStatus(body);
  }

  @Put('/code/:code')
  alterLockStatus(
    @Param('code') code: number,
    @Body() body: ILockStatus,
  ): Promise<IMessage> {
    return this.service.alterLockStatus(code, body);
  }

  @Delete('/code/:code')
  deleteLockStatus(@Param('code') code: number): Promise<IMessage> {
    return this.service.deleteLockStatus(code);
  }
}
