export interface IProduct {
  _id?: string;
  sku: string;
  name: string;
  type: string;
  value: number;
  length: number;
  width: number;
  height: number;
}

export interface IProductWithStatusCode {
  status: number;
  products: IProduct[];
}
