import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from '../interface/Message.interface';
import { CompanyModelName } from '../schema/Company.schema';
import { Company } from '../model/Company.model';
import {
  ICompany,
  ICompanyWithStatusCode,
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
              email: body.email,
              password: body.password,
              picture: body.picture,
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

  alterPassword(_id: string, password: string): Promise<IMessage> {
    return this.companyModel
      .updateOne({ _id: _id }, { password: password })
      .then((): IMessage => {
        return {
          status: 201,
          message: 'Senha atualizada com sucesso!',
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getHashPassword(_id: string): Promise<string> {
    return this.companyModel
      .findOne(
        { _id: _id },
        {
          _id: 0,
          name: 0,
          email: 0,
          picture: 0,
          cnpj: 0,
          area: 0,
          address: 0,
          senders: 0,
          type: 0,
          status: 0,
        },
      )
      .then((res): string => {
        return res.password;
      })
      .catch((error) => {
        throw new Error(error);
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
                picture: body.picture,
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

  uploadImage(_id: string, imageLink: string): Promise<IMessage> {
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
            .updateOne({ _id: _id }, { picture: imageLink })
            .then((): IMessage => {
              return {
                status: 201,
                message: 'Foto de perfil atualizada com sucesso!',
              };
            });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  insertEmployee(
    company_id: string | unknown,
    _id: string | unknown,
  ): Promise<void | unknown> {
    return this.companyModel.updateOne(
      { _id: company_id },
      { $push: { senders: _id } },
    );
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
