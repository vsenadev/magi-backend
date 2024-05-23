import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/test-utils';
import { CompanyService } from '../../service/Company.service';
import { CompanyRepository } from '../../repository/Company.repository';
import {
  ICompany,
  ICompanyWithStatusCode,
} from '../../interface/Company.interface';
import { IMessage } from '../../interface/Message.interface';

describe('CompanyService', () => {
  let service: CompanyService;
  let repository: CompanyRepository;
  const results: TestResult[] = [];

  const mockRepository = {
    createCompany: jest.fn(),
    getAllCompanies: jest.fn(),
    alterCompany: jest.fn(),
    deleteCompany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: CompanyRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repository = module.get<CompanyRepository>(CompanyRepository);
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
    const message: IMessage = { status: 201, message: 'Success' };

    mockRepository.createCompany.mockResolvedValue(message);

    const result = await service.createCompany(company);

    expect(result).toEqual(message);
    results.push({ route: 'Service: createCompany', status: 'Passed' });
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

    mockRepository.getAllCompanies.mockResolvedValue(response);

    const result = await service.getAllCompanies();

    expect(result).toEqual(response);
    results.push({ route: 'Service: getAllCompanies', status: 'Passed' });
  });

  it('should alter a company', async () => {
    const company: ICompany = {
      name: 'Updated Company',
      cnpj: '123456789012345678',
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
    const message: IMessage = { status: 201, message: 'Updated' };

    mockRepository.alterCompany.mockResolvedValue(message);

    const result = await service.alterCompany('1', company);

    expect(result).toEqual(message);
    results.push({ route: 'Service: alterCompany', status: 'Passed' });
  });

  it('should delete a company', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockRepository.deleteCompany.mockResolvedValue(message);

    const result = await service.deleteCompany('1');

    expect(result).toEqual(message);
    results.push({ route: 'Service: deleteCompany', status: 'Passed' });
  });
});
