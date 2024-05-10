import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from '../interface/Message.interface';
import { CompanyModelName } from '../schema/Company.schema';
import { Company } from '../model/Company.model';
import {
  ICompany,
  ICompanyWithStatusCode
} from '../interface/Company.interface';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(CompanyModelName)
    private readonly companyModel: Model<Company>,
  ) {}

  createCompany(body: ICompany): Promise<IMessage> {
    return this.companyModel
      .findOne({ cnpj: body.cnpj })
      .then((existingCompany) => {
        if (existingCompany) {
          return {
            status: 409,
            message: 'Empresa já existe, por favor verificar.',
          };
        } else {
          return this.companyModel
            .create({
              name: body.name.toUpperCase(),
              cnpj: body.cnpj,
              area: body.area,
              address: body.address,
              senders: body.senders,
              type: body.type,
              status: body.status,
            })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Empresa criada com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getAllCompanies(): Promise<ICompanyWithStatusCode> {
    return this.companyModel
      .find({}, { _id: 0, __v: 0 })
      .then((companies: ICompany[]) => {
        return {
          status: 200,
          companies: companies,
        };
      });
  }

  alterCompany(_id: string, body: ICompany): Promise<IMessage> {
    return this.companyModel
      .findOne({ _id: _id })
      .then((existingCompany) => {
        if (!existingCompany) {
          return {
            status: 404,
            message: 'Empresa não existe, por favor verificar.',
          };
        } else {
          return this.companyModel
            .updateOne(
              {
                _id: _id,
              },
              {
                name: body.name.toUpperCase(),
                cnpj: body.cnpj,
                area: body.area,
                address: body.address,
                senders: body.senders,
                type: body.type,
                status: body.status,
              },
            )
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Empresa atualizada com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  deleteCompany(_id: string): Promise<IMessage> {
    return this.companyModel
      .findOne({ _id: _id })
      .then((existingCompany) => {
        if (!existingCompany) {
          return {
            status: 404,
            message: 'Empresa não existe, por favor verificar.',
          };
        } else {
          return this.companyModel
            .deleteOne({ _id: _id })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Empresa excluida com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
