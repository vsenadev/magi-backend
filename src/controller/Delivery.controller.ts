import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IMessage } from '../interface/Message.interface';
import {
  IDelivery,
  IDeliveryWithStatusCode,
} from '../interface/Delivery.interface';
import { DeliveryService } from '../service/Delivery.service';

@Controller('api/delivery')
export class DeliveryController {
  constructor(private readonly service: DeliveryService) {}

  @Post('')
  createDeliveryType(@Body() body: IDelivery): Promise<IMessage> {
    return this.service.createDelivery(body);
  }

  @Get('')
  getAllDeliveryType(): Promise<IDeliveryWithStatusCode> {
    return this.service.getAllDeliveries();
  }

  @Put('/id/:id')
  alterDeliveryType(
    @Param('id') id: string,
    @Body() body: IDelivery,
  ): Promise<IMessage> {
    return this.service.alterDelivery(id, body);
  }

  @Delete('/id/:id')
  deleteDeliveryType(@Param('id') id: string): Promise<IMessage> {
    return this.service.deleteDelivery(id);
  }
}
