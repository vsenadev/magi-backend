import { Injectable } from '@nestjs/common';
import { IMessage } from '../interface/Message.interface';
import { UserTypeRepository } from '../repository/UsertType.repository';
import {
  IUserType,
  IUserTypeWithStatusCode,
} from '../interface/UserType.interface';
import { UserTypeDto } from '../dto/UserType.dto';
import { errorMessage } from '../utils/Error.utils';

@Injectable()
export class UserTypeService {
  constructor(private readonly repository: UserTypeRepository) {}

  createUserType(body: IUserType): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        UserTypeDto.parse(body);

        this.repository
          .createUserType(body)
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

  getAllUserType(): Promise<IUserTypeWithStatusCode> {
    return new Promise((resolve, reject) => {
      this.repository
        .getAllUserType()
        .then((result: IUserTypeWithStatusCode) => {
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

  alterUserType(code: number, body: IUserType): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        UserTypeDto.parse(body);
        this.repository
          .alterUserType(code, body)
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

  deleteUserType(code: number): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      this.repository
        .deleteUserType(code)
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
