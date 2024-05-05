import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountStatus } from '../model/AccountStatus.model';
import { AccountStatusModelName } from '../schema/AccountStatus.schema';
import { IMessage } from '../interface/Message.interface';
import {
  IAccountStatusWithStatusCode,
  IAccountStatus,
} from '../interface/AccountStatus.interface';

@Injectable()
export class AccountStatusRepository {
  constructor(
    @InjectModel(AccountStatusModelName)
    private readonly accountStatusModel: Model<AccountStatus>,
  ) {}

  createAccountStatus(body: IAccountStatus): Promise<IMessage> {
    return this.accountStatusModel
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
            message: 'Status da conta já existe, por favor verificar.',
          };
        } else {
          return this.accountStatusModel
            .create({
              code: body.code,
              description: body.description.toUpperCase(),
            })
            .then(() => {
              return {
                status: 201,
                message: 'Status da conta criado com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getAllAccountStatus(): Promise<IAccountStatusWithStatusCode> {
    return this.accountStatusModel
      .find({}, { _id: 0, __v: 0 })
      .then((accountsStatus: IAccountStatus[]) => {
        return {
          status: 200,
          AccountStatus: accountsStatus,
        };
      });
  }

  alterAccountStatus(code: number, body: IAccountStatus): Promise<IMessage> {
    return this.accountStatusModel
      .findOne({ code: code })
      .then((existingStatus) => {
        if (!existingStatus) {
          return {
            status: 404,
            message: 'Status da conta não existe, por favor verificar.',
          };
        } else {
          return this.accountStatusModel
            .updateOne(
              {
                code: code,
              },
              {
                description: body.description.toUpperCase(),
              },
            )
            .then(() => {
              return {
                status: 201,
                message: 'Status da conta atualizado com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  deleteAccountStatus(code: number): Promise<IMessage> {
    return this.accountStatusModel
      .findOne({ code: code })
      .then((existingStatus) => {
        if (!existingStatus) {
          return {
            status: 404,
            message: 'Status da conta não existe, por favor verificar.',
          };
        } else {
          return this.accountStatusModel.deleteOne({ code: code }).then(() => {
            return {
              status: 201,
              message: 'Status da conta excluido com sucesso!',
            };
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
