import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LockStatusService } from '../service/LockStatus.service';
import { IMessage } from '../interface/Message.interface';
import {
  ILockStatus,
  ILockStatusWithStatusCode,
} from '../interface/LockStatus.interface';

@Controller('api/lockstatus')
export class LockStatusController {
  constructor(private readonly service: LockStatusService) {}

  @Post('')
  createLockStatus(@Body() body: ILockStatus): Promise<IMessage> {
    return this.service.createLockStatus(body);
  }

  @Get('')
  getAllLockStatus(): Promise<ILockStatusWithStatusCode> {
    return this.service.getAllLockStatus();
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
