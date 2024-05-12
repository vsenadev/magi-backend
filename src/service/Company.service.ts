import { Injectable } from '@nestjs/common';
import { IMessage } from '../interface/Message.interface';
import { CompanyRepository } from '../repository/Company.repository';
import {
  ICompany,
  ICompanyWithStatusCode,
} from '../interface/Company.interface';
import { CompanyDto } from '../dto/Company.dto';
import { errorMessage } from '../utils/error';
import { IImage } from '../interface/Image.interface';
import axios from 'axios';

@Injectable()
export class CompanyService {
  constructor(private readonly repository: CompanyRepository) {}

  createCompany(body: ICompany): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        CompanyDto.parse(body);

        this.repository
          .createCompany(body)
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
