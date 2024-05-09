export interface IExpectedRoute {
    latitude: number;
    longitude: number;
  }
  
  export interface IExpectedRouteWithStatusCode {
    status: number;
    expectedRoutes: IExpectedRoute[];
  }
  