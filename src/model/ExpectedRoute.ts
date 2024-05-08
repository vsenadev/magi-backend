import { Document } from 'mongoose';

export interface ExpectedRoute extends Document {
    latitude: string;
    longitude: string;
  }