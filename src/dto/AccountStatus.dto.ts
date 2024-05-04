import { z } from 'zod';

export const AccountStatusDto = z.object({
  id: z.string().uuid().optional(),
  code: z.number().min(1),
  description: z.string().min(4).max(20),
});
