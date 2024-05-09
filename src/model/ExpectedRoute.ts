import { Document, model } from 'mongoose';
import { ExpectedRouteSchema } from '../schema/ExpectedRoute.schema';

export interface ExpectedRoute extends Document {
    latitude: string;
    longitude: string;
  }

  export const ExpectedRouteModel = model<ExpectedRoute>('ExpectedRoute', ExpectedRouteSchema);

// Implementação da classe para criar instâncias de ExpectedRoute
export class ExpectedRouteInstance {
    constructor(public latitude: string, public longitude: string) {}
}

// Função utilitária para criar uma instância de ExpectedRoute
export function createExpectedRoute(latitude: string, longitude: string): ExpectedRoute {
    const instance = new ExpectedRouteInstance(latitude, longitude);
    return instance as ExpectedRoute;
}