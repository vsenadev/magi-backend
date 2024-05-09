import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  IExpectedRoute,
  IExpectedRouteWithStatusCode,
} from '../interface/ExpectedRoute.interface';
import { IMessage } from 'src/interface/Message.interface';
import { ExpectedRouteService } from '../service/ExpectedRoute.service';

@Controller('api/ExpectedRoutes')
export class ExpectedRouteController {
  constructor(private readonly service: ExpectedRouteService) {}

  @Post('')
  createExpectedRoute(@Body() body: IExpectedRoute): Promise<IMessage> {
    return this.service.createExpectedRoute(body);
  }

  @Get('')
  getAllExpectedRoutes(): Promise<IExpectedRouteWithStatusCode> {
    return this.service.getAllExpectedRoutes();
  }

  @Put('/latitude/:latitude/longitude/:longitude')
  alterExpectedRoute(
    @Param('latitude') latitude: number, @Param('longitude') longitude: number,
    @Body() body: IExpectedRoute,
  ): Promise<IMessage> {
    return this.service.alterExpectedRoute(latitude, longitude, body);
  }

  @Delete('/latitude/:latitude/longitude/:longitude')
  deleteExpectedRoute(@Param('latitude') latitude: number, @Param('longitude') longitude: number): Promise<IMessage> {
    return this.service.deleteExpectedRoute(latitude, longitude);
  }
}
