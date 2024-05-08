import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TracedRouteModelName } from '../schema/TracedRoute.schema';
import {
    ITracedRoute,
    ITracedRouteWithStatusCode,
} from '../interface/TracedRoute.interface';
import { IMessage } from '../interface/Message.interface';
import { TracedRoute } from '../model/TracedRoute.model';

@Injectable()
export class TracedRouteRepository {
    constructor(
        @InjectModel(TracedRouteModelName)
        private readonly TracedRouteModel: Model<TracedRoute>,
    ) { }

    createTracedRoute(body: ITracedRoute): Promise<IMessage> {
        return this.TracedRouteModel
            .findOne({
                $or: [
                    { destiny: body.destiny },
                    { departure: body.departure },
                    { geolocation: body.geolocation },
                ],
            })
            .then((existingTracedRoute) => {
                if (existingTracedRoute) {
                    return {
                        status: 409,
                        message: 'Este produto já existe, por favor verificar.',
                    };
                } else {
                    return this.TracedRouteModel
                        .create({
                            destiny: body.destiny,
                            departure: body.departure,
                            geolocation: body.geolocation
                        })
                        .then(() => {
                            return {
                                status: 201,
                                message: 'Produto criado com sucesso!',
                            };
                        });
                }
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    getAllTracedRoutes(): Promise<ITracedRouteWithStatusCode> {
        return this.TracedRouteModel
            .find({}, { _id: 0, __v: 0 })
            .then((TracedRoutes: ITracedRoute[]) => {
                return {
                    status: 200,
                    tracedRoutes: TracedRoutes,
                };
            });
    }

    alterTracedRoute(latitude: string, longitude: string, body: ITracedRoute): Promise<IMessage> {
        return this.TracedRouteModel
            .findOne({ latitude: latitude, longitude: longitude })
            .then((existingTracedRoute) => {
                if (!existingTracedRoute) {
                    return {
                        status: 404,
                        message: 'Rota Esperada não existe, por favor verificar.',
                    };
                } else {
                    return this.TracedRouteModel
                        .updateOne(
                            {
                                latitude: latitude,
                                longitude: longitude
                            },
                            {
                                latitude: latitude,
                                longitude: longitude
                            }
                        )
                        .then(() => {
                            return {
                                status: 201,
                                message: 'Rota Esperada atualizada com sucesso!',
                            };
                        });
                }
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    deleteTracedRoute(latitude: string, longitude: string): Promise<IMessage> {
        return this.TracedRouteModel
            .findOne({ latitude: latitude, longitude: longitude })
            .then((existingTracedRoute) => {
                if (!existingTracedRoute) {
                    return {
                        status: 404,
                        message: 'Rota Esperada não existe, por favor verificar.',
                    };
                } else {
                    return this.TracedRouteModel.deleteOne({ latitude: latitude, longitude: longitude }).then(() => {
                        return {
                            status: 201,
                            message: 'Rota Esperada excluída com sucesso!',
                        };
                    });
                }
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
}
