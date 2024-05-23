import { Module } from '@nestjs/common';
import { MqttService } from '../middleware/Mqtt.service';

@Module({
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
