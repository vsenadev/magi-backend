import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';
import * as process from 'node:process';
import { DeliveryRepository } from '../repository/Delivery.repository';
import { RotaValidator } from '../utils/routeValidator';
import { IDelivery } from 'src/interface/Delivery.interface';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: MqttClient;
  constructor(private readonly repository: DeliveryRepository, private readonly validator: RotaValidator) { }

  onModuleInit() {
    this.connectToMqtt();
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.end();
    }
  }

  private connectToMqtt() {
    this.client = connect(process.env.MQTT_BROKER_URL, {
      port: parseInt(process.env.MQTT_PORT),
      protocol: 'mqtts',
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
    });

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.subscribeToTopic('delivery/topic');
    });

    this.client.on('error', (error) => {
      console.error('MQTT connection error:', error);
    });
  }

  subscribeToTopic(topic: string) {
    this.client.subscribe(topic, (error) => {
      if (error) {
        console.error(`Subscription to ${topic} failed:`, error);
        return;
      }
      console.log(`Subscribed to ${topic}`);
    });

    this.client.on('message', (topic, message) => {
      const stringMessage = JSON.parse(message.toString())
      const objectMessage = JSON.parse(stringMessage);
      this.repository.saveTracedRouteById(objectMessage._id, objectMessage.coordinates).then(() => {
        const tracedRoute = this.repository.getTracedRouteById(objectMessage._id) 
        this.repository.getExpectedRouteById(objectMessage._id).then((routes) => {
          this.validator.routeValidate(objectMessage.coordinates, routes['expectedRoute'])
        });
      })




    });
  }
}
