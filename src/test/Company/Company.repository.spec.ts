import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CompanyRepository } from '../../repository/Company.repository';
import { IMessage } from '../../interface/Message.interface';

describe('CompanyRepository', () => {
  let repository: CompanyRepository;

  const mockCompanyModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyRepository,
        {
          provide: getModelToken('Company'),
          useValue: mockCompanyModel,
        },
      ],
    }).compile();

    repository = module.get<CompanyRepository>(CompanyRepository);
  });

  it('should create a company', async () => {
    const company = {
      name: 'Example Company',
      cnpj: '123456789012345678',
      email: 'empresa@email.com',
      password: '123456789',
      picture: '',
      area: 'Example Area',
      address: {
        cep: '123456789',
        road: 'Example Road',
        complement: 'Example Complement',
        city: 'Example City',
        state: 'Example State',
        number: '123',
      },
      senders: [],
      type: 1,
      status: 1,
    };
    const existingCompany = null;

    mockCompanyModel.findOne.mockResolvedValue(existingCompany);
    mockCompanyModel.create.mockResolvedValue({});

    const result: IMessage = await repository.createCompany(company);

    expect(mockCompanyModel.findOne).toBeCalledWith({ cnpj: company.cnpj });
    expect(mockCompanyModel.create).toBeCalledWith({
      name: company.name.toUpperCase(),
      picture: company.picture,
      cnpj: company.cnpj,
      email: company.email,
      password: company.password,
      area: company.area,
      address: company.address,
      senders: company.senders,
      type: company.type,
      status: company.status,
    });
    expect(result).toEqual({
      status: 201,
      message: 'Empresa criada com sucesso!',
    });
  });

  it('should get all companies', async () => {
    const companies = [
      {
        name: 'Example Company',
        cnpj: '12345678901234',
        area: 'Example Area',
        email: 'empresa@email.com',
        password: '123456789',
        address: {
          cep: '123456789',
          road: 'Example Road',
          complement: 'Example Complement',
          city: 'Example City',
          state: 'Example State',
          number: '123',
        },
        senders: [],
        type: 1,
        status: 1,
      },
    ];

    mockCompanyModel.find.mockResolvedValue(companies);

    const result = await repository.getAllCompanies();

    expect(result).toEqual({ status: 200, companies: companies });
  });

  it('should alter a company', async () => {
    const _id = '1';
    const company = {
      name: 'Updated Company',
      cnpj: '123456789012345678',
      email: 'empresa@email.com',
      picture: '',
      password: '123456789',
      area: 'Updated Area',
      address: {
        cep: '123456789',
        road: 'Updated Road',
        complement: 'Updated Complement',
        city: 'Updated City',
        state: 'Updated State',
        number: '123',
      },
      senders: [],
      type: 1,
      status: 1,
    };
    const existingCompany = { _id: _id };

    mockCompanyModel.findOne.mockResolvedValue(existingCompany);
    mockCompanyModel.updateOne.mockResolvedValue({});

    const result: IMessage = await repository.alterCompany(_id, company);

    expect(mockCompanyModel.findOne).toBeCalledWith({ _id: _id });
    expect(mockCompanyModel.updateOne).toBeCalledWith(
      { _id: _id },
      {
        name: company.name.toUpperCase(),
        cnpj: company.cnpj,
        picture: company.picture,
        area: company.area,
        address: company.address,
        senders: company.senders,
        type: company.type,
        status: company.status,
      },
    );
    expect(result).toEqual({
      status: 201,
      message: 'Empresa atualizada com sucesso!',
    });
  });

  it('should delete a company', async () => {
    const _id = '1';
    const existingCompany = { _id: _id };

    mockCompanyModel.findOne.mockResolvedValue(existingCompany);
    mockCompanyModel.deleteOne.mockResolvedValue({});

    const result: IMessage = await repository.deleteCompany(_id);

    expect(mockCompanyModel.findOne).toBeCalledWith({ _id: _id });
    expect(mockCompanyModel.deleteOne).toBeCalledWith({ _id: _id });
    expect(result).toEqual({
      status: 201,
      message: 'Empresa excluida com sucesso!',
    });
  });

  it('should insert an employee', async () => {
    const company_id = 'company_id';
    const employee_id = 'employee_id';

    mockCompanyModel.updateOne.mockResolvedValue({ nModified: 1 });

    const result = await repository.insertEmployee(company_id, employee_id);

    expect(mockCompanyModel.updateOne).toBeCalledWith(
      { _id: company_id },
      { $push: { senders: employee_id } },
    );
    expect(result).toEqual({ nModified: 1 });
  });
});
