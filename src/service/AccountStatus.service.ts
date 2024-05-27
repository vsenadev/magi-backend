import { Injectable } from '@nestjs/common';
import { AccountStatusRepository } from '../repository/AccountStatus.repository';
import { IMessage } from '../interface/Message.interface';
import {
  IAccountStatusWithStatusCode,
  IAccountStatus,
} from '../interface/AccountStatus.interface';
import { AccountStatusDto } from '../dto/AccountStatus.dto';
import { errorMessage } from '../utils/error';

@Injectable()
export class AccountStatusService {
  constructor(private readonly repository: AccountStatusRepository) {}

  createAccountStatus(body: IAccountStatus): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        AccountStatusDto.parse(body);
        this.repository
          .createAccountStatus(body)
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

  getAllAccountStatus(): Promise<IAccountStatusWithStatusCode> {
    return new Promise((resolve, reject) => {
      this.repository
        .getAllAccountStatus()
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

  alterAccountStatus(code: number, body: IAccountStatus): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        AccountStatusDto.parse(body);
        this.repository
          .alterAccountStatus(code, body)
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

  deleteAccountStatus(code: number): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      this.repository
        .deleteAccountStatus(code)
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
