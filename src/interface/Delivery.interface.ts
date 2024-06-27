import { IProductWithID } from './Product.interface';

export interface IDelivery {
  _id?: string;
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

export interface ISender {
  _id: string;
}

export interface IExpectedRoute {
  latitude: number;
  longitude: number;
}

export interface ITracedRoute {
  latitude: number;
  longitude: number;
}

export interface IDeliveryWithStatusCode {
  status: number;
  deliveries: IDelivery[];
}
