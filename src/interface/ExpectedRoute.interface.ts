export interface IExpectedRoute {
    latitude: string;
    longitude: string;
  }
  
  export interface IExpectedRouteWithStatusCode {
    status: number;
    expectedRoutes: IExpectedRoute[];
  }
  