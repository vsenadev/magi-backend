import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpectedRouteController } from '../controller/ExpectedRoute.controller';
import { ExpectedRouteService } from '../service/ExpectedRoute.service';
import {
  ExpectedRouteSchema,
  ExpectedRouteModelName,
} from '../schema/ExpectedRoute.schema';
import { ExpectedRouteRepository } from '../repository/ExpectedRoute.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExpectedRouteModelName, schema: ExpectedRouteSchema },
    ]),
  ],
  controllers: [ExpectedRouteController],
  providers: [ExpectedRouteService, ExpectedRouteRepository],
})
export class ExpectedRouteModule {}
