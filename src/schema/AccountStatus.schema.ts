import { Schema } from 'mongoose';
import { AccountStatus } from '../model/AccountStatus.model';

export const AccountStatusSchema = new Schema<AccountStatus>({
  code: { type: Number, required: true },
  description: { type: String, required: true },
});

export const AccountStatusModelName = 'AccountStatus';
