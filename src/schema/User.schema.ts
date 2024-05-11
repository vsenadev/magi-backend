import { Schema } from 'mongoose';
import { User } from '../model/User.model';

export const UserSchema = new Schema<User>({
  id_company: { type: String, required: true },
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  telephone: { type: String, required: true },
  password: { type: String, required: true },
  mail: { type: String, required: true },
  type: { type: Number, required: true },
  status: { type: Number, required: true },
});

export const UserModelName = 'User';
