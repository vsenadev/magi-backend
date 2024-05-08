import { Injectable } from '@nestjs/common';
import {
  IExpectedRoute,
  IExpectedRouteWithStatusCode,
} from '../interface/ExpectedRoute.interface';
import { ExpectedRouteDto } from '../dto/ExpectedRoute.dto';
import { IMessage } from '../interface/Message.interface';
import { errorMessage } from '../utils/error';
import { ExpectedRouteRepository } from '../repository/ExpectedRoute.repository';

@Injectable()
export class ExpectedRouteService {
  constructor(private readonly repository: ExpectedRouteRepository) { }

  createExpectedRoute(body: IExpectedRoute): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        ExpectedRouteDto.parse(body);
        this.repository
          .createExpectedRoute(body)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject({
              status: 500,
              message: error.message,
            });
          });
      } catch (error) {
        resolve({
          status: 400,
          message: errorMessage(JSON.parse(error.message)),
        });
      }
    });
  }

  getAllExpectedRoutes(): Promise<IExpectedRouteWithStatusCode> {
    return new Promise((resolve, reject) => {
      this.repository
        .getAllExpectedRoutes()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject({
            status: 500,
            message: error.message,
          });
        });
    });
  }


  alterExpectedRoute(latitude: string, longitude: string, body: IExpectedRoute): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        ExpectedRouteDto.parse(body);
        this.repository
          .alterExpectedRoute(latitude, longitude, body)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject({
              status: 500,
              message: errorMessage(JSON.parse(error.message)),
            });
          });
      } catch (error) {
        resolve({
          status: 400,
          message: errorMessage(JSON.parse(error.message)),
        });
      }
    });
  }

  deleteExpectedRoute(latitude: string, longitude: string): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      this.repository
        .deleteExpectedRoute(latitude, longitude)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject({
            status: 500,
            message: error.message,
          });
        });
    });
  }
}
