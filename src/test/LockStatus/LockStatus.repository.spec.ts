import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestResult, printResults } from '../test-utils';
import { LockStatusRepository } from '../../repository/LockStatus.repository';
import { LockStatus } from '../../model/LockStatus.model';
import { IMessage } from '../../interface/Message.interface';
import { ILockStatus, ILockStatusWithStatusCode } from '../../interface/LockStatus.interface';

describe('LockStatusRepository', () => {
  let repository: LockStatusRepository;
  let model: Model<LockStatus>;
  const results: TestResult[] = [];

  const mockModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LockStatusRepository,
        {
          provide: getModelToken('LockStatus'),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<LockStatusRepository>(LockStatusRepository);
    model = module.get<Model<LockStatus>>(getModelToken('LockStatus'));
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create lock status', async () => {
    const lockStatus: ILockStatus = { code: 123, description: 'New Lock' };
    const message: IMessage = {
      status: 201,
      message: 'Status da tranca criado com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(null);
    mockModel.create.mockResolvedValue(null);

    const result = await repository.createLockStatus(lockStatus);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: createLockStatus',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      $or: [{ code: lockStatus.code }, { description: lockStatus.description.toUpperCase() }],
    });
    expect(mockModel.create).toHaveBeenCalledWith({
      code: lockStatus.code,
      description: lockStatus.description.toUpperCase(),
    });
  });

  it('should get all lock statuses', async () => {
    const lockStatuses: ILockStatus[] = [
      { code: 1, description: 'teste' },
    ];
    const response: ILockStatusWithStatusCode = {
      status: 200,
      LockStatus: lockStatuses,
    };

    mockModel.find.mockResolvedValue(lockStatuses);

    const result = await repository.getAllLockStatus();

    expect(result).toEqual(response);
    results.push({
      route: 'Repository: getAllLockStatus',
      status: 'Passed',
    });
    expect(mockModel.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
  });

  it('should alter lock status', async () => {
    const code = 123;
    const lockStatus: ILockStatus = { code: 123, description: 'Updated Lock' };
    const message: IMessage = {
      status: 201,
      message: 'Status da conta atualizado com sucesso!',
    };

    mockModel.findOne.mockResolvedValue({ code });
    mockModel.updateOne.mockResolvedValue(null);

    const result = await repository.alterLockStatus(code, lockStatus);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: alterLockStatus',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({ code });
    expect(mockModel.updateOne).toHaveBeenCalledWith({ code }, { description: lockStatus.description.toUpperCase() });
  });

  it('should delete lock status', async () => {
    const code = 123;
    const message: IMessage = {
      status: 201,
      message: 'Status da tranca excluído com sucesso!',
    };

    mockModel.findOne.mockResolvedValue({ code });
    mockModel.deleteOne.mockResolvedValue(null);

    const result = await repository.deleteLockStatus(code);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteLockStatus',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({ code });
    expect(mockModel.deleteOne).toHaveBeenCalledWith({ code });
  });

  it('should return 404 if lock status does not exist', async () => {
    const code = 123;
    const message: IMessage = {
      status: 404,
      message: 'Status da tranca não existe.',
    };

    mockModel.findOne.mockResolvedValue(null);

    const result = await repository.deleteLockStatus(code);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteLockStatus (Not Found)',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({ code });
  });
});
