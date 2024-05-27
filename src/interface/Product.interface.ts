export interface IProduct {
  _id?: string | unknown;
  sku?: string;
  name: string;
  type: string;
  value: number;
  length: number;
  width: number;
  height: number;
  idEmpresa: string;
}

export interface IProductWithStatusCode {
  status: number;
  products: IProduct[];
}

export interface IProductWithID {
  _id: string;
}
