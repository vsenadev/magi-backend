import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from '../interface/Message.interface';
import { UserModelName } from '../schema/User.schema';
import { User } from '../model/User.model';
import { IUser, IUserWithStatusCode } from '../interface/User.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModelName)
    private readonly userModel: Model<User>,
  ) {}

  createUser(body: IUser): Promise<IMessage> {
    return this.userModel
      .findOne({
        $or: [{ mail: body.mail }, { cpf: body.cpf }],
      })
      .then((existingUser) => {
        if (existingUser) {
          return {
            status: 409,
            message: 'Usuário já existe, por favor verificar.',
          };
        } else {
          return this.userModel
            .create({
              id_company: body.id_company,
              name: body.name.toUpperCase(),
              picture: '',
              cpf: body.cpf,
              telephone: body.telephone,
              password: body.password,
              mail: body.mail,
              type: body.type,
              status: body.status,
            })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'User created successfully',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getAllUsers(): Promise<IUserWithStatusCode> {
    return this.userModel
      .find({}, { _id: 0, __v: 0 })
      .then((users: IUser[]) => {
        return {
          status: 200,
          users: users,
        };
      });
  }

  alterUser(_id: string, body: IUser): Promise<IMessage> {
    return this.userModel
      .findOne({ _id: _id })
      .then((existingUser) => {
        if (!existingUser) {
          return {
            status: 404,
            message: 'Usuário não existe, por favor verificar.',
          };
        } else {
          return this.userModel
            .updateOne(
              {
                _id: _id,
              },
              {
                id_company: body.id_company,
                name: body.name.toUpperCase(),
                picture: body.picture,
                cpf: body.cpf,
                telephone: body.telephone,
                password: body.password,
                mail: body.mail,
                type: body.type,
                status: body.status,
              },
            )
            .then((): IMessage => {
              return {
                status: 201,
                message: 'User updated successfully',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  uploadImage(_id: string, imageLink: string): Promise<IMessage> {
    return this.userModel
      .findOne({ _id: _id })
      .then((existingCompany) => {
        if (!existingCompany) {
          return {
            status: 404,
            message: 'Empresa não existe, por favor verificar.',
          };
        } else {
          return this.userModel
            .updateOne({ _id: _id }, { picture: imageLink })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Foto de perfil atualizada com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  deleteUser(_id: string): Promise<IMessage> {
    return this.userModel
      .findOne({ _id: _id })
      .then((existingUser) => {
        if (!existingUser) {
          return {
            status: 404,
            message: 'Usuário não existe, por favor verificar.',
          };
        } else {
          return this.userModel.deleteOne({ _id: _id }).then((): IMessage => {
            return {
              status: 201,
              message: 'User deleted successfully',
            };
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
