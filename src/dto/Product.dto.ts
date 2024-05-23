import { z } from 'zod';

export const ProductDto = z.object({
  sku: z.string().uuid().optional(),
  name: z.string().min(1).max(50),
  type: z.string().min(4).max(30),
  value: z.number().positive(),
  length: z.number().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
});
