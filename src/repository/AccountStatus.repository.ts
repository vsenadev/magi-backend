// generate-diagram.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountStatus } from '../model/AccountStatus.model';
import { AccountStatusModelName } from '../schema/AccountStatus.schema';
import { IMessage } from '../interface/Message.interface';
import { IAccountStatusInterface } from '../interface/AccountStatus.interface';

@Injectable()
export class AccountStatusRepository {
  constructor(
    @InjectModel(AccountStatusModelName)
    private readonly accountStatusModel: Model<AccountStatus>,
  ) {}

  createStatus(body: IAccountStatusInterface): Promise<IMessage> {
    return this.accountStatusModel
      .findOne({
        $or: [{ code: body.code }, { description: body.description }],
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
              description: body.description,
            })
            .then(() => {
              return {
                status: 201,
                message: 'Status da conta criado com sucesso.',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
