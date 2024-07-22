import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/Test.utils';
import { CompanyService } from '../../service/Company.service';
import { CompanyRepository } from '../../repository/Company.repository';
import {
  ICompany,
  ICompanyWithStatusCode,
} from '../../interface/Company.interface';
import { IMessage } from '../../interface/Message.interface';
import { RandomCode } from '../../utils/RandomCode.utils';
import { Cryptography } from '../../utils/Cryptography.utils';
import { Email } from '../../utils/Email.utils';
import axios from 'axios';

jest.mock('axios');

describe('CompanyService', () => {
  let service: CompanyService;
  let repository: CompanyRepository;
  let codeGenerator: RandomCode;
  let cryptography: Cryptography;
  let email: Email;
  const results: TestResult[] = [];

  const mockRepository = {
    createCompany: jest.fn(),
    getAllCompanies: jest.fn(),
    alterCompany: jest.fn(),
    deleteCompany: jest.fn(),
    uploadImage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        RandomCode,
        Cryptography,
        Email,
        {
          provide: CompanyRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repository = module.get<CompanyRepository>(CompanyRepository);
    codeGenerator = module.get<RandomCode>(RandomCode);
    cryptography = module.get<Cryptography>(Cryptography);
    email = module.get<Email>(Email);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create a company', async () => {
    const company: ICompany = {
      name: 'Example Company',
      cnpj: '123456789012345678',
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
    };
    const message: IMessage = { status: 201, message: 'Success' };

    jest
      .spyOn(codeGenerator, 'generateRandomPassword')
      .mockReturnValue('randomPassword');
    jest
      .spyOn(cryptography, 'hashPassword')
      .mockResolvedValue('hashedPassword');
    jest.spyOn(email, 'sendEmailWithCode').mockResolvedValue(undefined);

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
          email: 'empresa@email.com',
          password: '123456789',
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
      email: 'empresa@email.com',
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

  it('should upload an image', async () => {
    const image = {
      buffer: Buffer.from('image data'),
    };
    const message: IMessage = { status: 200, message: 'Image uploaded' };
    const axiosResponse = {
      data: {
        data: {
          image: {
            url: 'http://example.com/image.jpg',
          },
        },
      },
    };

    (axios.post as jest.Mock).mockResolvedValue(axiosResponse);
    mockRepository.uploadImage.mockResolvedValue(message);

    const result = await service.uploadImage('1', image as any);

    expect(result).toEqual(message);
    results.push({ route: 'Service: uploadImage', status: 'Passed' });
  });
});
