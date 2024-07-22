import { Schema } from 'mongoose';
import { Company } from '../model/Company.model';

export const CompanySchema = new Schema<Company>({
  picture: { type: String, required: false },
  name: { type: String, required: true },
  cnpj: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  area: { type: String, required: true },
  address: { type: Object, required: true },
  senders: [{ type: Object, required: true }],
  type: { type: Number, required: true },
  status: { type: Number, required: true },
});

export const CompanyModelName = 'Company';
