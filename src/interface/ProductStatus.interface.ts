export interface IProductStatus {
  _id?: string | unknown;
  code?: number;
  description: string;
}

export interface IProductStatusWithStatusCode {
  status: number;
  productStatus: IProductStatus[];
}
