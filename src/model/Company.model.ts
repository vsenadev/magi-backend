import { IAddress, ISender } from '../interface/Company.interface';

export interface Company extends Document {
  _id?: string;
  picture?: string;
  name: string;
  cnpj: string;
  area: string;
  address: IAddress;
  senders: ISender[];
  type: number;
  status: number;
}
