import { IAddress, ISender } from '../interface/Company.interface';

export interface Company extends Document {
  _id?: string;
  name: string;
  cnpj: string;
  area: string;
  address: IAddress;
  senders: ISender[];
  type: number;
  status: number;
}
