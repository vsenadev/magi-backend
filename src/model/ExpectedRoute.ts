import { Document, model } from 'mongoose';
import { ExpectedRouteSchema } from '../schema/ExpectedRoute.schema';

export interface ExpectedRoute extends Document {
    latitude: number;
    longitude: number;
  }

  export const ExpectedRouteModel = model<ExpectedRoute>('ExpectedRoute', ExpectedRouteSchema);

// Implementação da classe para criar instâncias de ExpectedRoute
export class ExpectedRouteInstance {
    constructor(public latitude: number, public longitude: number) {}
}

// Função utilitária para criar uma instância de ExpectedRoute
export function createExpectedRoute(latitude: number, longitude: number): ExpectedRoute {
    const instance = new ExpectedRouteInstance(latitude, longitude);
    return instance as ExpectedRoute;
}