import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductStatus } from '../model/ProductStatus.model';
import { ProductStatusModelName } from '../schema/ProductStatus.schema';
import { IMessage } from '../interface/Message.interface';
import {
  IProductStatusWithStatusCode,
  IProductStatus,
} from '../interface/ProductStatus.interface';

@Injectable()
export class ProductStatusRepository {
  constructor(
    @InjectModel(ProductStatusModelName)
    private readonly ProductStatusModel: Model<ProductStatus>,
  ) {}

  createProductStatus(body: IProductStatus): Promise<IMessage> {
    return this.ProductStatusModel
      .findOne({
        $or: [
          { code: body.code },
          { description: body.description.toUpperCase() },
        ],
      })
      .then((existingStatus) => {
        if (existingStatus) {
          return {
            status: 409,
            message: 'Status do produto já existe, por favor verificar.',
          };
        } else {
          return this.ProductStatusModel
            .create({
              code: body.code,
              description: body.description.toUpperCase(),
            })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Status do produto criado com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getAllProductStatus(): Promise<IProductStatusWithStatusCode> {
    return this.ProductStatusModel
      .find({}, { _id: 0, __v: 0 })
      .then((ProductsStatus: IProductStatus[]) => {
        return {
          status: 200,
          productStatus: ProductsStatus,
        };
      });
  }

  alterProductStatus(code: number, body: IProductStatus): Promise<IMessage> {
    return this.ProductStatusModel
      .findOne({ code: code })
      .then((existingStatus) => {
        if (!existingStatus) {
          return {
            status: 404,
            message: 'Status do produto não existe, por favor verificar.',
          };
        } else {
          return this.ProductStatusModel
            .updateOne(
              {
                code: code,
              },
              {
                description: body.description.toUpperCase(),
              },
            )
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Status do produto atualizado com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  deleteProductStatus(code: number): Promise<IMessage> {
    return this.ProductStatusModel
      .findOne({ code: code })
      .then((existingStatus) => {
        if (!existingStatus) {
          return {
            status: 404,
            message: 'Status do produto não existe, por favor verificar.',
          };
        } else {
          return this.ProductStatusModel
            .deleteOne({ code: code })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Status do produto excluido com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
