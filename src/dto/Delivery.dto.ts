import { z } from 'zod';

export const DeliveryDto = z.object({
  _id: z.string().optional(),
  name: z.string().min(1).max(50),
  sender: z.array(z.object({ _id: z.string() })),
  sendDate: z.string(),
  expectedDate: z.string(),
  status: z.number().min(1),
  products: z.array(z.object({ _id: z.string() })),
  lockStatus: z.number(),
  expectedRoute: z.array(
    z.object({ latitude: z.number(), longitude: z.number() }),
  ),
  tracedRoute: z.array(
    z.object({ latitude: z.number(), longitude: z.number() }),
  ),
  startingAddress: z.string(),
  destination: z.string(),
});
