import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from '../interface/Message.interface';
import { UserTypeModelName } from '../schema/UserType.schema';
import { UserType } from '../model/UserType.model';
import {
  IUserType,
  IUserTypeWithStatusCode,
} from '../interface/UserType.interface';

@Injectable()
export class UserTypeRepository {
  constructor(
    @InjectModel(UserTypeModelName)
    private readonly userTypeModel: Model<UserType>,
  ) {}

  createUserType(body: IUserType): Promise<IMessage> {
    return this.userTypeModel
      .findOne({
        $or: [
          { code: body.code },
          { description: body.description.toUpperCase() },
        ],
      })
      .then((existingType) => {
        if (existingType) {
          return {
            status: 409,
            message: 'Tipo de usuário já existe, por favor verificar.',
          };
        } else {
          return this.userTypeModel
            .create({
              code: body.code,
              description: body.description.toUpperCase(),
            })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Tipo de usuário criado com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getAllUserType(): Promise<IUserTypeWithStatusCode> {
    return this.userTypeModel
      .find({}, { _id: 0, __v: 0 })
      .then((userType: IUserType[]) => {
        return {
          status: 200,
          UserType: userType,
        };
      });
  }

  alterUserType(code: number, body: IUserType): Promise<IMessage> {
    return this.userTypeModel
      .findOne({ code: code })
      .then((existingType) => {
        if (!existingType) {
          return {
            status: 404,
            message: 'Tipo de usuário não existe, por favor verificar.',
          };
        } else {
          return this.userTypeModel
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
                message: 'Tipo de usuário atualizado com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  deleteUserType(code: number): Promise<IMessage> {
    return this.userTypeModel
      .findOne({ code: code })
      .then((existingType) => {
        if (!existingType) {
          return {
            status: 404,
            message: 'Tipo de usuário não existe, por favor verificar.',
          };
        } else {
          return this.userTypeModel
            .deleteOne({ code: code })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Tipo de usuário excluido com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
