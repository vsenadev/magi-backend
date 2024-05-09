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
import { ExpectedRoute } from 'src/model/ExpectedRoute';

@Injectable()
export class TracedRouteRepository {
    constructor(
        @InjectModel(TracedRouteModelName)
        private readonly TracedRouteModel: Model<TracedRoute>,
    ) { }

    async createTracedRoute(body: ITracedRoute): Promise<IMessage> {
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
                        message: 'Esta rota já existe.',
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
                                message: 'rota criada com sucesso!',
                            };
                        });
                }
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    async getAllTracedRoutes(): Promise<ITracedRouteWithStatusCode> {
        return this.TracedRouteModel
            .find({}, { _id: 0, __v: 0 })
            .then((TracedRoutes: ITracedRoute[]) => {
                return {
                    status: 200,
                    tracedRoutes: TracedRoutes,
                };
            });
    }

    async alterTracedRoute(destiny: string, departure: string, geolocation: ExpectedRoute): Promise<IMessage> {
        return this.TracedRouteModel
            .findOne({ destiny: destiny, departure: departure, geolocation: geolocation })
            .then((existingTracedRoute) => {
                if (!existingTracedRoute) {
                    return {
                        status: 404,
                        message: 'Esta rota não existe, por favor verificar.',
                    };
                } else {
                    return this.TracedRouteModel
                        .updateOne(
                            {
                                destiny: destiny,
                                departure: departure,
                                geolocation: geolocation
                            },
                            {
                                destiny: destiny,
                                departure: departure,
                                geolocation: geolocation
                            }
                        )
                        .then(() => {
                            return {
                                status: 201,
                                message: 'Rota traçada atualizada com sucesso!',
                            };
                        });
                }
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    async deleteTracedRoute(destiny: string, departure: string, geolocation: ExpectedRoute): Promise<IMessage> {
        return this.TracedRouteModel
            .findOne({ destiny: destiny, departure: departure, geolocation: geolocation })
            .then((existingTracedRoute) => {
                if (!existingTracedRoute) {
                    return {
                        status: 404,
                        message: 'Esta rota não existe, por favor verificar.',
                    };
                } else {
                    return this.TracedRouteModel.deleteOne({ destiny: destiny, departure: departure, geolocation: geolocation }).then(() => {
                        return {
                            status: 201,
                            message: 'Rota traçada excluída com sucesso!',
                        };
                    });
                }
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
}
