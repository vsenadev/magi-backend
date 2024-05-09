import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TracedRouteController } from '../controller/TracedRoute.controller';
import { TracedRouteService } from '../service/TracedRoute.service';
import {
  TracedRouteSchema,
  TracedRouteModelName,
} from '../schema/TracedRoute.schema';
import { TracedRouteRepository } from '../repository/TracedRoute.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TracedRouteModelName, schema: TracedRouteSchema },
    ]),
  ],
  controllers: [TracedRouteController],
  providers: [TracedRouteService, TracedRouteRepository],
})
export class TracedRouteModule {}
