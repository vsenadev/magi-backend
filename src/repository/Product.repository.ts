import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../model/Product.model';
import { ProductModelName } from '../schema/Product.schema';
import {
  IProduct,
  IProductWithStatusCode,
} from '../interface/Product.interface';
import { IMessage } from 'src/interface/Message.interface';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(ProductModelName)
    private readonly ProductModel: Model<Product>,
  ) {}

  async createProduct(body: IProduct): Promise<IMessage> {
    return this.ProductModel.findOne({
      $or: [{ sku: body.sku }, { name: body.name }],
    })
      .then((existingProduct) => {
        if (existingProduct) {
          return {
            status: 409,
            message: 'Este produto já existe, por favor verificar.',
          };
        } else {
          return this.ProductModel.create({
            sku: body.sku,
            name: body.name,
            type: body.type,
            value: body.value,
            length: body.length,
            width: body.width,
            height: body.height,
          }).then(() => {
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

  async getAllProducts(): Promise<IProductWithStatusCode> {
    return this.ProductModel.find({}, { _id: 0, __v: 0 }).then(
      (products: IProduct[]) => {
        return {
          status: 200,
          products: products,
        };
      },
    );
  }

  async alterProduct(sku: string, body: IProduct): Promise<IMessage> {
    return this.ProductModel.findOne({ sku: sku })
      .then((existingProduct) => {
        if (!existingProduct) {
          return {
            status: 404,
            message: 'Produto não existe, por favor verificar.',
          };
        } else {
          return this.ProductModel.updateOne(
            {
              sku: sku,
            },
            {
              sku: sku,
              name: body.name,
              type: body.type,
              value: body.value,
              length: body.length,
              width: body.width,
              height: body.height,
            },
          ).then(() => {
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

  async deleteProduct(sku: string): Promise<IMessage> {
    return this.ProductModel.findOne({ sku: sku })
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
