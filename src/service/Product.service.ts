import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/Product.repository';
import {
  IProduct,
  IProductWithStatusCode,
} from '../interface/Product.interface';
import { ProductDto } from '../dto/Product.dto';
import { IMessage } from 'src/interface/Message.interface';
import { v4 as uuidv4 } from 'uuid';
import { errorMessage } from '../utils/Error.utils';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  createProduct(body: IProduct): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        body['sku'] = uuidv4();
        ProductDto.parse(body);
        this.repository
          .createProduct(body)
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

  getAllProducts(): Promise<IProductWithStatusCode> {
    return new Promise((resolve, reject) => {
      this.repository
        .getAllProducts()
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

  alterProduct(sku: string, body: IProduct): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        ProductDto.parse(body);
        this.repository
          .alterProduct(sku, body)
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

  deleteProduct(sku: string): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      this.repository
        .deleteProduct(sku)
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
