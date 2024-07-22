import { Injectable } from '@nestjs/common';
import { IMessage } from '../interface/Message.interface';
import { UserRepository } from '../repository/User.repository';
import { IUser, IUserWithStatusCode } from '../interface/User.interface';
import { UserDto } from '../dto/User.dto';
import { errorMessage } from '../utils/Error.utils';
import { IImage } from '../interface/Image.interface';
import axios from 'axios';
import { CompanyRepository } from '../repository/Company.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  createUser(body: IUser): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        UserDto.parse(body);

        this.repository
          .createUser(body)
          .then((result) => {
            if (result && result._id) {
              this.companyRepository
                .insertEmployee(body['id_company'], result._id.toString())
                .then((res) => {
                  resolve(result);
                })
                .catch((error) => {
                  reject({
                    status: 500,
                    message: error.message,
                  });
                });
            } else {
              reject({
                status: 500,
                message: 'Invalid result from createUser',
              });
            }
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

  uploadImage(_id: string, image: IImage): Promise<IMessage> {
    const formData = new FormData();
    const imageBase64 = image.buffer.toString('base64');

    formData.append('key', process.env.IMAGE_BB_KEY);
    formData.append('image', imageBase64);

    return new Promise((resolve, reject) => {
      try {
        axios
          .post('https://api.imgbb.com/1/upload', formData)
          .then((response) => {
            const imageLink = response.data['data']['image']['url'];
            this.repository
              .uploadImage(_id, imageLink)
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject({
                  status: 500,
                  message: errorMessage(JSON.parse(error.message)),
                });
              });
          })
          .catch((error) => {
            reject(error);
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
