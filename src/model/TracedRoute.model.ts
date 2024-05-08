import { Document } from 'mongoose';
import { ExpectedRoute } from './ExpectedRoute';

export interface TracedRoute extends Document {
    destiny: string;
    departure: string;
    geolocation: ExpectedRoute;
  }