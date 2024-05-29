import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';
import * as process from 'node:process';
import { DeliveryRepository } from '../repository/Delivery.repository';
import { RotaValidatorService } from '../utils/routeValidator';
import { IDelivery } from 'src/interface/Delivery.interface';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: MqttClient;
  private validatorService: RotaValidatorService;
  private deliveryRepository: DeliveryRepository;

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

      console.log(`Received message from ${topic}: ${message.toString()}`);

      // entender como esperar objeto message do tipo IDelivery

      var messageString = message.toString().replace(/(\w+)\s*:/g, '"$1":').trim();
      let messageObject = JSON.parse(messageString);

      let expectedRoute = messageObject.expectedRoute;
      let tracedRoute = messageObject.tracedRoute;
      let lockStatus = messageObject.lockStatus;
      let status = messageObject.status;

      let objeto: IDelivery;
      //logica para validar
      if(!this.validatorService.validarRota(tracedRoute, expectedRoute)){
        lockStatus = "Ativo"
        status = "Saiu da rota!"
      }
      
       // logica de enviar pro banco e salvar 
       //falta ID auto increment
       //criar a cada requisição? seria a melhor forma?
       this.deliveryRepository.createDelivery(objeto)
    });
  }
}