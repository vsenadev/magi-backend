import { Injectable } from '@nestjs/common';
import { IMessage } from '../interface/Message.interface';
import {
  IProductStatusWithStatusCode,
  IProductStatus,
} from '../interface/ProductStatus.interface';
import { ProductStatusDto } from '../dto/ProductStatus.dto';
import { errorMessage } from '../utils/error';
import { ProductStatusRepository } from '../repository/ProductStatus.repository';

@Injectable()
export class ProductStatusService {
  constructor(private readonly repository: ProductStatusRepository) {}

  createProductStatus(body: IProductStatus): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        ProductStatusDto.parse(body);
        this.repository
          .createProductStatus(body)
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

  getAllProductStatus(): Promise<IProductStatusWithStatusCode> {
    return new Promise((resolve, reject) => {
      this.repository
        .getAllProductStatus()
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

  alterProductStatus(code: number, body: IProductStatus): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        ProductStatusDto.parse(body);
        this.repository
          .alterProductStatus(code, body)
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

  deleteProductStatus(code: number): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      this.repository
        .deleteProductStatus(code)
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
