import { Document } from 'mongoose';

export interface Product extends Document {
  sku: string;
  name: string;
  type: string;
  value: number;
  length: number;
  width: number;
  height: number;
  idEmpresa: string;
}
