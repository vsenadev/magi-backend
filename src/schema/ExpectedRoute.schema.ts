import { Schema } from 'mongoose';
import { ExpectedRoute } from '../model/ExpectedRoute';

export const ExpectedRouteSchema = new Schema<ExpectedRoute>({
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
});

export const ExpectedRouteModelName = 'ExpectedRoute';
