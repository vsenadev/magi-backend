import { Document } from 'mongoose';

export interface AccountStatus extends Document {
  code: number;
  description: string;
}
