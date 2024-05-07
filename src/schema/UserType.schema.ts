import { Schema } from 'mongoose';
import { UserType } from '../model/UserType.model';

export const UserTypeSchema = new Schema<UserType>({
  code: { type: Number, required: true },
  description: { type: String, required: true },
});

export const UserTypeModelName = 'UserType';
