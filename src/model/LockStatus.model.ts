import { Document } from 'mongoose';

export interface LockStatus extends Document {
  code: number;
  description: string;
}
