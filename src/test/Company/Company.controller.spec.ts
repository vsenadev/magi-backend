import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/test-utils';
import { CompanyController } from '../../controller/Company.controller';
import { CompanyService } from '../../service/Company.service';
import {
  ICompany,
  ICompanyWithStatusCode
} from '../../interface/Company.interface';
import { IMessage } from '../../interface/Message.interface';

describe('CompanyController', () => {
  let controller: CompanyController;
  let service: CompanyService;
  const results: TestResult[] = [];

  const mockService = {
    createCompany: jest.fn(),
    getAllCompanies: jest.fn(),
    alterCompany: jest.fn(),
    deleteCompany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanyService>(CompanyService);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create a company', async () => {
    const company: ICompany = {
      name: 'Example Company',
      cnpj: '123456789012345678',
      area: 'Example Area',
      address: {
        cep: '12345-678',
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
    const message: IMessage = { status: 201, message: 'Success' };

    mockService.createCompany.mockResolvedValue(message);

    const result = await controller.createUserType(company);

    expect(result).toEqual(message);
    results.push({ route: 'POST /api/company', status: 'Passed' });
  });

  it('should get all companies', async () => {
    const response: ICompanyWithStatusCode = {
      status: 200,
      companies: [
        {
          name: 'Example Company',
          cnpj: '12345678901234',
          area: 'Example Area',
          address: {
            cep: '12345678',
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
      ],
    };

    mockService.getAllCompanies.mockResolvedValue(response);

    const result = await controller.getAllUserType();

    expect(result).toEqual(response);
    results.push({ route: 'GET /api/company', status: 'Passed' });
  });

  it('should alter a company', async () => {
    const company: ICompany = {
      name: 'Updated Company',
      cnpj: '12345678901234',
      area: 'Updated Area',
      address: {
        cep: '12345678',
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
    const message: IMessage = { status: 201, message: 'Updated' };

    mockService.alterCompany.mockResolvedValue(message);

    const result = await controller.alterUserType('1', company);

    expect(result).toEqual(message);
    results.push({
      route: 'PUT /api/company/id/:id',
      status: 'Passed',
    });
  });

  it('should delete a company', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockService.deleteCompany.mockResolvedValue(message);

    const result = await controller.deleteUserType('1');

    expect(result).toEqual(message);
    results.push({
      route: 'DELETE /api/company/id/:id',
      status: 'Passed',
    });
  });
});
