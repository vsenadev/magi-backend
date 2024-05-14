export interface IProductStatus {
  _id?: string;
  code?: number;
  description: string;
}

export interface IProductStatusWithStatusCode {
  status: number;
  productStatus: IProductStatus[];
}
