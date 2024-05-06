import { Document } from 'mongoose';

export interface UserType extends Document {
  code: number;
  description: string;
}
