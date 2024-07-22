import { Injectable } from '@nestjs/common';
import { IMessage } from '../interface/Message.interface';
import { DeliveryRepository } from '../repository/Delivery.repository';
import {
  IDelivery,
  IDeliveryWithStatusCode,
} from '../interface/Delivery.interface';
import { DeliveryDto } from '../dto/Delivery.dto';
import { errorMessage } from '../utils/Error.utils';

@Injectable()
export class DeliveryService {
  constructor(private readonly repository: DeliveryRepository) {}

  createDelivery(body: IDelivery): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        DeliveryDto.parse(body);
        this.repository
          .createDelivery(body)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject({
              status: 500,
              message: error.message,
            });
          });
      } catch (error) {
        resolve({
          status: 400,
          message: errorMessage(JSON.parse(error.message)),
        });
      }
    });
  }

  getAllDeliveries(): Promise<IDeliveryWithStatusCode> {
    return new Promise((resolve, reject) => {
      this.repository
        .getAllDeliveries()
        .then((result: IDeliveryWithStatusCode) => {
          resolve(result);
        })
        .catch((error) => {
          reject({
            status: 500,
            message: error.message,
          });
        });
    });
  }

  alterDelivery(_id: string, body: IDelivery): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        DeliveryDto.parse(body);
        this.repository
          .alterDelivery(_id, body)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject({
              status: 500,
              message: errorMessage(JSON.parse(error.message)),
            });
          });
      } catch (error) {
        resolve({
          status: 400,
          message: errorMessage(JSON.parse(error.message)),
        });
      }
    });
  }

  deleteDelivery(_id: string): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      this.repository
        .deleteDelivery(_id)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject({
            status: 500,
            message: error.message,
          });
        });
    });
  }
}
