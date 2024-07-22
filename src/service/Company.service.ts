import { Injectable } from '@nestjs/common';
import { IMessage } from '../interface/Message.interface';
import { CompanyRepository } from '../repository/Company.repository';
import {
  ICompany,
  ICompanyWithStatusCode,
} from '../interface/Company.interface';
import { CompanyDto } from '../dto/Company.dto';
import { errorMessage } from '../utils/Error.utils';
import { IImage } from '../interface/Image.interface';
import axios from 'axios';
import { RandomCode } from '../utils/RandomCode.utils';
import { Cryptography } from '../utils/Cryptography.utils';
import { Email } from '../utils/Email.utils';

@Injectable()
export class CompanyService {
  constructor(
    private readonly repository: CompanyRepository,
    private readonly codeGenerator: RandomCode,
    private readonly cryptography: Cryptography,
    private readonly email: Email,
  ) {}

  createCompany(body: ICompany): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        const codeGenerated = this.codeGenerator.generateRandomPassword();
        this.cryptography
          .hashPassword(codeGenerated)
          .then((res) => {
            body['password'] = res;
            CompanyDto.parse(body);
            this.repository
              .createCompany(body)
              .then((result) => {
                if (result.status === 201) {
                  this.email
                    .sendEmailWithCode(
                      body['email'],
                      'Defina Sua Primeira Senha!',
                      body['name'],
                      codeGenerated,
                    )
                    .then(() => {
                      resolve(result);
                    });
                }
                resolve(result);
              })
              .catch((error) => {
                reject({
                  status: 500,
                  message: error.message,
                });
              });
          })
          .catch((hashError) => {
            console.error('Error hashing password:', hashError);
          });
      } catch (error) {
        resolve({
          status: 400,
          message: errorMessage(JSON.parse(error.message)),
        });
      }
    });
  }

  getAllCompanies(): Promise<ICompanyWithStatusCode> {
    return new Promise((resolve, reject) => {
      this.repository
        .getAllCompanies()
        .then((result: ICompanyWithStatusCode) => {
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

  alterCompany(_id: string, body: ICompany): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        CompanyDto.parse(body);
        this.repository
          .alterCompany(_id, body)
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

  alterPassword(_id: string, password: string): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        this.cryptography.hashPassword(password).then((res) => {
          this.repository
            .alterPassword(_id, res)
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject({
                status: 500,
                message: errorMessage(JSON.parse(error.message)),
              });
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

  validateCode(_id: string, password: string): Promise<boolean | IMessage> {
    return new Promise((resolve, reject) => {
      try {
        this.repository.getHashPassword(_id).then((res: string) => {
          this.cryptography
            .comparePassword(password, res)
            .then((result: boolean) => {
              resolve(result);
            })
            .catch((error) => {
              reject({
                status: 500,
                message: errorMessage(JSON.parse(error.message)),
              });
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

  deleteCompany(_id: string): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      this.repository
        .deleteCompany(_id)
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
