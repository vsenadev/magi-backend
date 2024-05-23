import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestResult, printResults } from '../../utils/test-utils';
import { AccountStatusRepository } from '../../repository/AccountStatus.repository';
import { AccountStatus } from '../../model/AccountStatus.model';
import {
  IAccountStatus,
  IAccountStatusWithStatusCode,
} from '../../interface/AccountStatus.interface';
import { IMessage } from '../../interface/Message.interface';

describe('AccountStatusRepository', () => {
  let repository: AccountStatusRepository;
  let model: Model<AccountStatus>;
  const results: TestResult[] = [];

  const mockModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountStatusRepository,
        {
          provide: getModelToken('AccountStatus'),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<AccountStatusRepository>(AccountStatusRepository);
    model = module.get<Model<AccountStatus>>(getModelToken('AccountStatus'));
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create account status', async () => {
    const accountStatus: IAccountStatus = { code: 1, description: 'Active' };
    const message: IMessage = {
      status: 201,
      message: 'Status da conta criado com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(null);
    mockModel.create.mockResolvedValue(message);

    const result = await repository.createAccountStatus(accountStatus);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: createAccountStatus',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      $or: [{ code: accountStatus.code }, { description: 'ACTIVE' }],
    });
    expect(mockModel.create).toHaveBeenCalledWith({
      code: accountStatus.code,
      description: 'ACTIVE',
    });
  });

  it('should get all account statuses', async () => {
    const accountStatuses: IAccountStatus[] = [
      { code: 1, description: 'Active' },
    ];
    const response: IAccountStatusWithStatusCode = {
      status: 200,
      AccountStatus: accountStatuses,
    };

    mockModel.find.mockResolvedValue(accountStatuses);

    const result = await repository.getAllAccountStatus();

    expect(result).toEqual(response);
    results.push({
      route: 'Repository: getAllAccountStatus',
      status: 'Passed',
    });
    expect(mockModel.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
  });

  it('should alter account status', async () => {
    const accountStatus: IAccountStatus = { code: 1, description: 'Inactive' };
    const message: IMessage = {
      status: 201,
      message: 'Status da conta atualizado com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(accountStatus);
    mockModel.updateOne.mockResolvedValue(message);

    const result = await repository.alterAccountStatus(1, accountStatus);

    expect(result).toEqual(message);
    results.push({ route: 'Repository: alterAccountStatus', status: 'Passed' });
    expect(mockModel.findOne).toHaveBeenCalledWith({ code: 1 });
    expect(mockModel.updateOne).toHaveBeenCalledWith(
      { code: 1 },
      { description: 'INACTIVE' },
    );
  });

  it('should delete account status', async () => {
    const accountStatus: IAccountStatus = { code: 1, description: 'Active' };
    const message: IMessage = {
      status: 201,
      message: 'Status da conta excluido com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(accountStatus);
    mockModel.deleteOne.mockResolvedValue(message);

    const result = await repository.deleteAccountStatus(1);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteAccountStatus',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({ code: 1 });
    expect(mockModel.deleteOne).toHaveBeenCalledWith({ code: 1 });
  });

  it('should return 404 if status does not exist', async () => {
    const message: IMessage = {
      status: 404,
      message: 'Status da conta não existe, por favor verificar.',
    };

    mockModel.findOne.mockResolvedValue(null);

    const result = await repository.deleteAccountStatus(1);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteAccountStatus (Not Found)',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({ code: 1 });
  });
});
