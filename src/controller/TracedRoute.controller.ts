import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  ITracedRoute,
  ITracedRouteWithStatusCode,
} from '../interface/TracedRoute.interface';
import { IMessage } from '../interface/Message.interface';
import { TracedRouteService } from '../service/TracedRoute.service';
import { ExpectedRoute } from 'src/model/ExpectedRoute';

@Controller('api/TracedRoutes')
export class TracedRouteController {
  constructor(private readonly service: TracedRouteService) { }

  @Post('')
  createTracedRoute(@Body() body: ITracedRoute): Promise<IMessage> {
    return this.service.createTracedRoute(body);
  }

  @Get('')
  getAllTracedRoutes(): Promise<ITracedRouteWithStatusCode> {
    return this.service.getAllTracedRoutes();
  }

  @Put('/destiny/:destiny/departure/:departure/geolocation/:geolocation')
  alterTracedRoute(
    @Param('destiny') destiny: string, @Param('departure') departure: string, @Param('geolocation') geolocation: ExpectedRoute,
    @Body() body: ITracedRoute): Promise<IMessage> {
    return this.service.alterTracedRoute(destiny, departure, geolocation, body);
  }

  @Delete('/destiny/:destiny/departure/:departure/geolocation/:geolocation')
  deleteTracedRoute(@Param('destiny') destiny: string, @Param('departure') departure: string, @Param('geolocation') geolocation: ExpectedRoute, @Body() body: ITracedRoute): Promise<IMessage> {
    return this.service.deleteTracedRoute(destiny, departure, geolocation);
  }
}
