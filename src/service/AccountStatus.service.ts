import { Injectable } from '@nestjs/common';
import { AccountStatusRepository } from '../repository/AccountStatus.repository';
import { IMessage } from '../interface/Message.interface';
import { IAccountStatusInterface } from '../interface/AccountStatus.interface';
import { AccountStatusDto } from '../dto/AccountStatus.dto';

@Injectable()
export class AccountStatusService {
  constructor(private readonly repository: AccountStatusRepository) {}

  createStatus(body: IAccountStatusInterface): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      try {
        AccountStatusDto.parse(body);

        this.repository
          .createStatus(body)
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
          message: 'Erro de validação: ' + JSON.parse(error.message)[0].message,
        });
      }
    });
  }
}
