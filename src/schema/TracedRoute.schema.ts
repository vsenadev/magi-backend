import { Schema } from 'mongoose';
import { TracedRoute } from 'src/model/TracedRoute.model';

export const TracedRouteSchema = new Schema<TracedRoute>({
    destiny: { type: String, required: true },
    departure: { type: String, required: true },
    geolocation: { type: Object, required: true },
});

export const TracedRouteModelName = 'TracedRoute';
