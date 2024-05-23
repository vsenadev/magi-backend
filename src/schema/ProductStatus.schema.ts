import { Schema } from 'mongoose';
import { ProductStatus } from '../model/ProductStatus.model';

export const ProductStatusSchema = new Schema<ProductStatus>({
  code: { type: Number, required: true },
  description: { type: String, required: true },
});

export const ProductStatusModelName = 'ProductStatus';
