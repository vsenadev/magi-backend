import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../model/Product.model';
import { ProductModelName } from '../schema/Product.schema';
import {
  IProduct,
} from '../interface/Product.interface';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(ProductModelName)
    private readonly ProductModel: Model<Product>,
  ) {}

  createProduct(body: IProduct): Promise<IProduct> {
    return this.ProductModel
      .findOne({
        $or: [
          { SKU: body.SKU },
          { name: body.name },
          { type: body.type },
          { value: body.value },
          { quantity: body.quantity },
          { length: body.length },
          { width: body.width },
          { height: body.height },
        ],
      })
      .then((existingProduct) => {
        if (existingProduct) {
          return {
            status: 409,
            message: 'Este produto já existe, por favor verificar.',
          };
        } else {
          return this.ProductModel
            .create({
                SKU: body.SKU,
                name: body.name,
                type: body.type,
                value: body.value,
                quantity: body.quantity,
                length: body.length,
                width: body.width,
                height: body.height,
            })
            .then(() => {
              return {
                status: 201,
                message: 'Produto criado com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getAllProducts(): Promise<IProduct> {
    return this.ProductModel
      .find({}, { _id: 0, __v: 0 })
      .then((Product: IProduct[]) => {
        return {
          status: 200,
          Product: Product,
        };
      });
  }

  alterProduct(sku: number, body: IProduct): Promise<IProduct> {
    return this.ProductModel
      .findOne({ sku: sku })
      .then((existingProduct) => {
        if (!existingProduct) {
          return {
            status: 404,
            message: 'Produto não existe, por favor verificar.',
          };
        } else {
          return this.ProductModel
            .updateOne(
              {
                sku: sku,
              },
              {
                name: body.name,
              },
              {
                type: body.type,
              },
              {
                value: body.value,
              },
              {
                quantity: body.quantity,
              },
              {
                length: body.length,
              },
              {
                width: body.width,
              },
              {
                height: body.height,
              },
            )
            .then(() => {
              return {
                status: 201,
                message: 'Produto atualizado com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  deleteProduct(sku: number): Promise<IProduct> {
    return this.ProductModel
      .findOne({ sku: sku })
      .then((existingProduct) => {
        if (!existingProduct) {
          return {
            status: 404,
            message: 'Produto não existe, por favor verificar.',
          };
        } else {
          return this.ProductModel.deleteOne({ sku: sku }).then(() => {
            return {
              status: 201,
              message: 'Produto excluído com sucesso!',
            };
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
