import { z } from 'zod';

export const ExpectedRouteDto = z.object({
    latitude: z.string().min(2).max(12),
    longitude: z.string().min(2).max(12)
});