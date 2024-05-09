import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExpectedRouteModelName } from '../schema/ExpectedRoute.schema';
import {
    IExpectedRoute,
    IExpectedRouteWithStatusCode,
} from '../interface/ExpectedRoute.interface';
import { IMessage } from 'src/interface/Message.interface';
import { ExpectedRoute } from '../model/ExpectedRoute';

@Injectable()
export class ExpectedRouteRepository {
    constructor(
        @InjectModel(ExpectedRouteModelName)
        private readonly ExpectedRouteModel: Model<ExpectedRoute>,
    ) { }

    createExpectedRoute(body: IExpectedRoute): Promise<IMessage> {
        return this.ExpectedRouteModel
            .findOne({
                $or: [
                    { latitude: body.latitude },
                    { longitude: body.longitude },
                ],
            })
            .then((existingExpectedRoute) => {
                if (existingExpectedRoute) {
                    return {
                        status: 409,
                        message: 'Esta rota já existe, por favor verificar.',
                    };
                } else {
                    return this.ExpectedRouteModel
                        .create({
                            latitude: body.latitude,
                            longitude: body.longitude
                        })
                        .then(() => {
                            return {
                                status: 201,
                                message: 'Rota Esperada criada com sucesso!',
                            };
                        });
                }
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    getAllExpectedRoutes(): Promise<IExpectedRouteWithStatusCode> {
        return this.ExpectedRouteModel
            .find({}, { _id: 0, __v: 0 })
            .then((ExpectedRoutes: IExpectedRoute[]) => {
                return {
                    status: 200,
                    expectedRoutes: ExpectedRoutes,
                };
            });
    }

    alterExpectedRoute(latitude: string, longitude: string, body: IExpectedRoute): Promise<IMessage> {
        return this.ExpectedRouteModel
            .findOne({ latitude: latitude, longitude: longitude })
            .then((existingExpectedRoute) => {
                if (!existingExpectedRoute) {
                    return {
                        status: 404,
                        message: 'Rota Esperada não existe, por favor verificar.',
                    };
                } else {
                    return this.ExpectedRouteModel
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

    deleteExpectedRoute(latitude: string, longitude: string): Promise<IMessage> {
        return this.ExpectedRouteModel
            .findOne({ latitude: latitude, longitude: longitude })
            .then((existingExpectedRoute) => {
                if (!existingExpectedRoute) {
                    return {
                        status: 404,
                        message: 'Rota Esperada não existe, por favor verificar.',
                    };
                } else {
                    return this.ExpectedRouteModel.deleteOne({ latitude: latitude, longitude: longitude }).then(() => {
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
