import { z } from 'zod';

export const UserDto = z.object({
  id: z.string().uuid().optional(),
  picture: z.string().optional(),
  name: z.string(),
  id_company: z.string().min(24).max(24),
  cpf: z.string().min(14).max(14),
  telephone: z.string().min(13).max(13),
  password: z.string().min(1),
  mail: z.string().email(),
  type: z.number().positive(),
  status: z.number().positive(),
});
