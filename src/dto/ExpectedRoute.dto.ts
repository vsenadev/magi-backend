import { z } from 'zod';

export const ExpectedRouteDto = z.object({
    latitude: z.number(),
    longitude: z.number()
});