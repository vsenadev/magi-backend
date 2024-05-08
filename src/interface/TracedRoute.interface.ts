import { ExpectedRoute } from "../model/ExpectedRoute";

export interface ITracedRoute {
    destiny: string;
    departure: string;
    geolocation: ExpectedRoute;
  }
  
  export interface ITracedRouteWithStatusCode {
    status: number;
    tracedRoutes: ITracedRoute[];
  }
  