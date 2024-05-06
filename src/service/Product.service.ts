import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/Product.repository';
import {
  IProduct,
} from '../interface/Product.interface';
import { ProductDto } from '../dto/Product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  createProduct(body: IProduct): Promise<IProduct> {
    return new Promise((resolve, reject) => {
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
    });
  }

  getAllProducts(): Promise<IProduct> {
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

  alterProduct(sku: number, body: IProduct): Promise<IProduct> {
    return new Promise((resolve, reject) => {
      this.repository
        .alterProduct(sku, body)
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

  deleteProduct(sku: number): Promise<IProduct> {
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
