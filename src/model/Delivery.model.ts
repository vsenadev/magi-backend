import { Document } from 'mongoose';
import {
  ISender,
  IExpectedRoute,
  ITracedRoute,
} from 'src/interface/Delivery.interface';
import { IProductWithID } from 'src/interface/Product.interface';

export interface Delivery extends Document {
  _id: string;
  name: string;
  sender: ISender[];
  sendDate: string;
  expectedDate: string;
  status: number;
  products: IProductWithID[];
  lockStatus: number;
  expectedRoute: IExpectedRoute[];
  tracedRoute: ITracedRoute[];
  startingAddress: string;
  destination: string;
}
