import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LockStatus } from '../model/LockStatus.model';
import { LockStatusModelName } from '../schema/LockStatus.schema';
import { IMessage } from '../interface/Message.interface';
import {
  ILockStatus,
  ILockStatusWithStatusCode,
} from '../interface/LockStatus.interface';

@Injectable()
export class LockStatusRepository {
  constructor(
    @InjectModel(LockStatusModelName)
    private readonly lockStatusModel: Model<LockStatus>,
  ) {}

  createLockStatus(body: ILockStatus): Promise<IMessage> {
    return this.lockStatusModel
      .findOne({
        $or: [
          { code: body.code },
          { description: body.description.toUpperCase() },
        ],
      })
      .then((existingLockStatus) => {
        if (existingLockStatus) {
          return {
            status: 409,
            message: 'Status da tranca já existe.',
          };
        } else {
          return this.lockStatusModel
            .create({
              code: body.code,
              description: body.description.toUpperCase(),
            })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Status da tranca criado com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getAllLockStatus(): Promise<ILockStatusWithStatusCode> {
    return this.lockStatusModel
      .find({}, { _id: 0, __v: 0 })
      .then((locksStatus: ILockStatus[]) => {
        return {
          status: 200,
          LockStatus: locksStatus,
        };
      });
  }

  alterLockStatus(code: number, body: ILockStatus): Promise<IMessage> {
    return this.lockStatusModel
      .findOne({ code: code })
      .then((existingLockStatus) => {
        if (!existingLockStatus) {
          return {
            status: 404,
            message: 'Status da tranca não existe.',
          };
        } else {
          return this.lockStatusModel
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
                message: 'Status da conta atualizado com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  deleteLockStatus(code: number): Promise<IMessage> {
    return this.lockStatusModel
      .findOne({ code: code })
      .then((existingStatus) => {
        if (!existingStatus) {
          return {
            status: 404,
            message: 'Status da tranca não existe.',
          };
        } else {
          return this.lockStatusModel
            .deleteOne({ code: code })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Status da tranca excluído com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
