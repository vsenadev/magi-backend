import { Injectable } from '@nestjs/common';
import { Client } from '@googlemaps/google-maps-services-js';
import { IExpectedRoute, ITracedRoute } from 'src/interface/Delivery.interface';
import { promise } from 'zod';
//pnpm install @googlemaps/google-maps-services-js


@Injectable()
export class RotaValidator {
  routeValidate(actualRoute: ITracedRoute, expectedRoute: IExpectedRoute[] | unknown[]): boolean{
    if(!expectedRoute.includes(actualRoute)){
      expectedRoute.forEach(element => {
        const distance = this.calculateDistanceBetweenTwoPoints(actualRoute, element);
        if (distance > 500) {
          return false;
      } else {
          return true;
      }
      });
    } 
    return true;
  }

  calculateDistanceBetweenTwoPoints(actualRoute, expectedRoute): number {
    const R = 6371e3; 
    const point1 = actualRoute.latitude * Math.PI / 180; 
    const point2 = expectedRoute.latitude * Math.PI / 180;
    const latitudeDifference = (expectedRoute.latitude - actualRoute.latitude) * Math.PI / 180;
    const longitudeDifference = (expectedRoute.longitude - actualRoute.longitude) * Math.PI / 180;

    const a = Math.sin(latitudeDifference/2) * Math.sin(latitudeDifference/2) +
              Math.cos(point1) * Math.cos(point2) *
              Math.sin(longitudeDifference/2) * Math.sin(longitudeDifference/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;
    return d;
}
}
