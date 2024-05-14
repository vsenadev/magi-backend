import { z } from 'zod';

export const CompanyDto = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(100),
  cnpj: z.string().min(18).max(18),
  area: z.string().min(3).max(50),
  address: z.object({
    cep: z.string().min(9).max(9),
    road: z.string().min(1).max(200),
    complement: z.string().min(1).max(200),
    city: z.string().min(1).max(200),
    state: z.string().min(1).max(200),
    number: z.string().min(1).max(10),
  }),
  senders: z.array(
    z.object({
      id: z.string().uuid().optional(),
    }),
  ),
  type: z.number().positive(),
  status: z.number().positive(),
});
