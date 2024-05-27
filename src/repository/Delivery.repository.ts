import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from '../interface/Message.interface';
import { DeliveryModelName } from '../schema/Delivery.schema';
import { Delivery } from '../model/Delivery.model';
import {
  IDelivery,
  IDeliveryWithStatusCode,
} from '../interface/Delivery.interface';

@Injectable()
export class DeliveryRepository {
  constructor(
    @InjectModel(DeliveryModelName)
    private readonly deliveryModel: Model<Delivery>,
  ) {}

  // Método para criar uma nova entrega
  createDelivery(body: IDelivery): Promise<IMessage> {
    return this.deliveryModel
      .findOne({ _id: body._id })
      .then((existingDelivery) => {
        if (existingDelivery) {
          return {
            status: 409,
            message: 'Entrega já existe, por favor verificar.',
          };
        } else {
          return this.deliveryModel
            .create({
              name: body.name.toUpperCase(),
              sender: body.sender,
              sendDate: body.sendDate,
              expectedDate: body.expectedDate,
              status: body.status,
              products: body.products,
              lockStatus: body.lockStatus,
              expectedRoute: body.expectedRoute,
              tracedRoute: body.tracedRoute,
              startingAddress: body.startingAddress,
              destination: body.destination,
            })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Entrega criada com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Método para obter todas as entregas
  getAllDeliveries(): Promise<IDeliveryWithStatusCode> {
    return this.deliveryModel
      .find({}, { _id: 0, __v: 0 })
      .then((deliveries: IDelivery[]) => {
        return {
          status: 200,
          deliveries: deliveries,
        };
      });
  }

  // Método para alterar uma entrega existente
  alterDelivery(_id: string, body: IDelivery): Promise<IMessage> {
    return this.deliveryModel
      .findOne({ _id: _id })
      .then((existingDelivery) => {
        if (!existingDelivery) {
          return {
            status: 404,
            message: 'Entrega não existe, por favor verificar.',
          };
        } else {
          return this.deliveryModel
            .updateOne(
              {
                _id: _id,
              },
              {
                name: body.name.toUpperCase(),
                sender: body.sender,
                sendDate: body.sendDate,
                expectedDate: body.expectedDate,
                status: body.status,
                products: body.products,
                lockStatus: body.lockStatus,
                expectedRoute: body.expectedRoute,
                tracedRoute: body.tracedRoute,
                startingAddress: body.startingAddress,
                destination: body.destination,
              },
            )
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Entrega atualizada com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Método para excluir uma entrega existente
  deleteDelivery(_id: string): Promise<IMessage> {
    return this.deliveryModel
      .findOne({ _id: _id })
      .then((existingDelivery) => {
        if (!existingDelivery) {
          return {
            status: 404,
            message: 'Entrega não existe, por favor verificar.',
          };
        } else {
          return this.deliveryModel
            .deleteOne({ _id: _id })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Entrega excluída com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getExpectedRouteById(
    id: string,
  ): Promise<{ status: number; expectedRoute: string }> {
    return this.deliveryModel
      .findOne({ _id: id }, { _id: 0, expectedRoute: 1 })
      .then((delivery) => {
        if (!delivery) {
          return {
            status: 404,
            expectedRoute: null,
          };
        }
        if (!delivery.expectedRoute || !Array.isArray(delivery.expectedRoute)) {
          return {
            status: 200,
            expectedRoute: '', 
          };
        }
        const expectedRouteString = delivery.expectedRoute.map(coord => `${coord.latitude},${coord.longitude}`).join(';');
        return {
          status: 200,
          expectedRoute: expectedRouteString,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  
  

  saveTrackedRouteById(id: string, trackedRoute: string): Promise<IMessage> {
    return this.deliveryModel
      .findOne({ _id: id })
      .then((delivery) => {
        if (!delivery) {
          return {
            status: 404,
            message: 'Entrega não existe, por favor verificar.',
          };
        } else {
          return this.deliveryModel
            .updateOne({ _id: id }, { tracedRoute: trackedRoute })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Rota traçada salva com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
