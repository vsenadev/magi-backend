import { Schema } from 'mongoose';
import { Delivery } from '../model/Delivery.model';

export const DeliverySchema = new Schema<Delivery>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  sender: [{ type: Object, required: true }],
  sendDate: { type: String, required: true },
  expectedDate: { type: String, required: true },
  status: [{ type: Number, required: true }],
  products: [{ type: Object, required: true }],
  lockStatus: { type: Number, required: true },
  expectedRoute: [{ type: Object, required: true }],
  tracedRoute: [{ type: Object, required: true }],
  startingAddress: { type: String, required: true },
  destination: { type: String, required: true },
});

export const DeliveryModelName = 'Delivery';