import { Schema } from 'mongoose';
import { ExpectedRoute } from '../model/ExpectedRoute';

export const ExpectedRouteSchema = new Schema<ExpectedRoute>({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
});

export const ExpectedRouteModelName = 'ExpectedRoute';
