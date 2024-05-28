import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from '../interface/Message.interface';
import { DeliveryModelName } from '../schema/Delivery.schema';
import { Delivery } from '../model/Delivery.model';
import {
  IDelivery,
  IDeliveryWithStatusCode, IExpectedRoute, ITracedRoute,
} from '../interface/Delivery.interface';

@Injectable()
export class DeliveryRepository {
  constructor(
    @InjectModel(DeliveryModelName)
    private readonly deliveryModel: Model<Delivery>,
  ) {}

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
  ): Promise<{ status: number; expectedRoute: IExpectedRoute[] | unknown }> {
    return this.deliveryModel
      .findOne(
        {
          _id: id,
        },
        {
          _id: 0,
          name: 0,
          sender: 0,
          sendDate: 0,
          expectedDate: 0,
          status: 0,
          products: 0,
          lockStatus: 0,
          tracedRoute: 0,
          startingAddress: 0,
          destination: 0,
        },
      )
      .then((delivery) => {
        return {
          status: 200,
          expectedRoute: delivery,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  saveTrackedRouteById(
    id: string,
    trackedRoute: ITracedRoute,
  ): Promise<IMessage> {
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
            .updateOne({ _id: id }, { $push: { tracedRoute: trackedRoute } })
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
