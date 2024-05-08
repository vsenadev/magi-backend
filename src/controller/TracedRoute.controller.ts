import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  ITracedRoute,
  ITracedRouteWithStatusCode,
} from '../interface/TracedRoute.interface';
import { IMessage } from '../interface/Message.interface';
import { TracedRouteService } from '../service/TracedRoute.service';

@Controller('api/TracedRoutes')
export class TracedRouteController {
  constructor(private readonly service: TracedRouteService) {}

  @Post('')
  createTracedRoute(@Body() body: ITracedRoute): Promise<IMessage> {
    return this.service.createTracedRoute(body);
  }

  @Get('')
  getAllTracedRoutes(): Promise<ITracedRouteWithStatusCode> {
    return this.service.getAllTracedRoutes();
  }

  @Put('/latitude/:latitude/longitude/:longitude')
  alterTracedRoute(
    @Param('latitude') latitude: string, @Param('longitude') longitude: string,
    @Body() body: ITracedRoute,
  ): Promise<IMessage> {
    return this.service.alterTracedRoute(latitude, longitude, body);
  }

  @Delete('/latitude/:latitude/longitude/:longitude')
  deleteTracedRoute(@Param('latitude') latitude: string, @Param('longitude') longitude: string): Promise<IMessage> {
    return this.service.deleteTracedRoute(latitude, longitude);
  }
}
