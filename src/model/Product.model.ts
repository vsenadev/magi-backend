import { Document } from 'mongoose';

export interface Product extends Document {
  SKU: number;
  name: string;
  type: string;
  value: number;
  quantity: number;
  length: number;
  width: number;
  height: number;
  }