import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryModelName, DeliverySchema } from '../schema/Delivery.schema';
import { DeliveryController } from '../controller/Delivery.controller';
import { DeliveryService } from '../service/Delivery.service';
import { DeliveryRepository } from '../repository/Delivery.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryModelName, schema: DeliverySchema },
    ]),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, DeliveryRepository],
})
export class DeliveryModule {}
