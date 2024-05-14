export interface ICompany {
  _id?: string;
  name: string;
  picture?: string;
  cnpj: string;
  area: string;
  address: IAddress;
  senders: ISender[];
  type: number;
  status: number;
}

export interface IAddress {
  cep: string;
  road: string;
  complement: string;
  city: string;
  state: string;
  number: string;
}

export interface ISender {
  _id?: string;
}

export interface ICompanyWithStatusCode {
  status: number;
  companies: ICompany[];
}
