import { Injectable } from '@nestjs/common';
import { LockStatusRepository } from '../repository/LockStatus.repository';
import { IMessage } from '../interface/Message.interface';
import {
  ILockStatus,
  ILockStatusWithStatusCode,
} from '../interface/LockStatus.interface';
import { LockStatusDto } from '../dto/LockStatus.dto';
import { errorMessage } from '../utils/error';

@Injectable()
export class LockStatusService {
  constructor(private readonly repository: LockStatusRepository) {}

  createLockStatus(body: ILockStatus): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        LockStatusDto.parse(body);
        this.repository
          .createLockStatus(body)
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

  getAllLockStatus(): Promise<ILockStatusWithStatusCode> {
    return new Promise((resolve, reject) => {
      this.repository
        .getAllLockStatus()
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

  alterLockStatus(code: number, body: ILockStatus): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        LockStatusDto.parse(body);
        this.repository
          .alterLockStatus(code, body)
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

  deleteLockStatus(code: number): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      this.repository
        .deleteLockStatus(code)
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
