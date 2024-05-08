import { Schema } from 'mongoose';
import { LockStatus } from '../model/LockStatus.model';

export const LockStatusSchema = new Schema<LockStatus>({
  code: { type: Number, required: true },
  description: { type: String, required: true },
});

export const LockStatusModelName = 'LockStatus';
