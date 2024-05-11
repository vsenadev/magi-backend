import { Injectable } from '@nestjs/common';
import { IMessage } from '../interface/Message.interface';
import { UserRepository } from '../repository/User.repository';
import { IUser, IUserWithStatusCode } from '../interface/User.interface';
import { UserDto } from '../dto/User.dto';
import { errorMessage } from '../utils/error';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  createUser(body: IUser): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        UserDto.parse(body);

        this.repository
          .createUser(body)
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

  getAllUsers(): Promise<IUserWithStatusCode> {
    return new Promise((resolve, reject) => {
      this.repository
        .getAllUsers()
        .then((result: IUserWithStatusCode) => {
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

  alterUser(_id: string, body: IUser): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        UserDto.parse(body);
        this.repository
          .alterUser(_id, body)
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

  deleteUser(_id: string): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      this.repository
        .deleteUser(_id)
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
