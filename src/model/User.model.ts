import { Document } from 'mongoose';

export interface User extends Document {
  id_company: string;
  name: string;
  cpf: string;
  telephone: string;
  password: string;
  mail: string;
  type: number;
  status: number;
}
