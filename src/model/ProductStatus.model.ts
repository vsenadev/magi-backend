import { Document } from 'mongoose';

export interface ProductStatus extends Document {
  code: number;
  description: string;
}
