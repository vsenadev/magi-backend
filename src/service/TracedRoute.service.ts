import { Injectable } from '@nestjs/common';
import {
  ITracedRoute,
  ITracedRouteWithStatusCode,
} from '../interface/TracedRoute.interface';
import { IMessage } from '../interface/Message.interface';
import { errorMessage } from '../utils/error';
import { TracedRouteDTO } from '../dto/TracedRoute.dto';
import { TracedRouteRepository } from '../repository/TracedRoute.repository';

@Injectable()
export class TracedRouteService {
  constructor(private readonly repository: TracedRouteRepository) { }

  createTracedRoute(body: ITracedRoute): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        TracedRouteDTO.parse(body);
        this.repository
          .createTracedRoute(body)
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

  getAllTracedRoutes(): Promise<ITracedRouteWithStatusCode> {
    return new Promise((resolve, reject) => {
      this.repository
        .getAllTracedRoutes()
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


  alterTracedRoute(latitude: string, longitude: string, body: ITracedRoute): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        TracedRouteDTO.parse(body);
        this.repository
          .alterTracedRoute(latitude, longitude, body)
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

  deleteTracedRoute(latitude: string, longitude: string): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      this.repository
        .deleteTracedRoute(latitude, longitude)
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
