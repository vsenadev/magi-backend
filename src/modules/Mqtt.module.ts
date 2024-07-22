import { Module } from '@nestjs/common';
import { MqttService } from '../middleware/Mqtt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryModelName, DeliverySchema } from '../schema/Delivery.schema';
import { DeliveryRepository } from '../repository/Delivery.repository';
import { RotaValidator } from 'src/utils/RouteValidator.utils';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryModelName, schema: DeliverySchema },
    ]),
  ],
  providers: [MqttService, DeliveryRepository, RotaValidator],
  exports: [MqttService],
})
export class MqttModule {}
