import { z } from 'zod';
import { ExpectedRouteDto } from './ExpectedRoute.dto';

export const TracedRouteDTO = z.object({
    destiny: z.string().min(10).max(100),
    departure: z.string().min(10).max(100),
    geolocation: ExpectedRouteDto
});
