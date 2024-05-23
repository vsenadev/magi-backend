import { Schema } from 'mongoose';
import { Product } from '../model/Product.model';

export const ProductSchema = new Schema<Product>({
  sku: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  length: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  idEmpresa: { type: String, required: true },
});

export const ProductModelName = 'Product';
