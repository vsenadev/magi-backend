import { Document, model } from 'mongoose';
import { TracedRouteSchema } from 'src/schema/TracedRoute.schema';
import { ExpectedRoute } from './ExpectedRoute';

export interface TracedRoute extends Document {
    destiny: string;
    departure: string;
    geolocation: ExpectedRoute;
  }

export const TracedRouteModel = model<TracedRoute>('TracedRoute', TracedRouteSchema);

// Implementação da classe para criar instâncias de TracedRoute
export class TracedRouteInstance {
    constructor(public destiny: string, public departure: string, geolocation: ExpectedRoute) {}
}

// Função utilitária para criar uma instância de TracedRoute
export function createTracedRoute(destiny: string, departure: string, geolocation: ExpectedRoute): TracedRoute {
    const instance = new TracedRouteInstance(destiny, departure, geolocation);
    return instance as TracedRoute;
}