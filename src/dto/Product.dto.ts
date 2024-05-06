import { z } from 'zod';

export const ProductDto = z.object({
  sku: z.number().uuid().optional(),
  name: z.string().min(1),
  type: z.string().min(4).max(20),
});