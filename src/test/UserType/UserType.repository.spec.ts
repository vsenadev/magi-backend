import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestResult, printResults } from '../../utils/Test.utils';
import { IMessage } from '../../interface/Message.interface';
import { UserTypeRepository } from '../../repository/UsertType.repository';
import { UserType } from '../../model/UserType.model';
import {
  IUserType,
  IUserTypeWithStatusCode,
} from '../../interface/UserType.interface';

describe('UserTypeRepository', () => {
  let repository: UserTypeRepository;
  let model: Model<UserType>;
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
        UserTypeRepository,
        {
          provide: getModelToken('UserType'),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<UserTypeRepository>(UserTypeRepository);
    model = module.get<Model<UserType>>(getModelToken('UserType'));
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create account status', async () => {
    const userType: IUserType = { code: 1, description: 'ADMIN' };
    const message: IMessage = {
      status: 201,
      message: 'Tipo de usuário criado com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(null);
    mockModel.create.mockResolvedValue(message);

    const result = await repository.createUserType(userType);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: createUserType',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      $or: [{ code: userType.code }, { description: 'ADMIN' }],
    });
    expect(mockModel.create).toHaveBeenCalledWith({
      code: userType.code,
      description: 'ADMIN',
    });
  });

  it('should get all account statuses', async () => {
    const userType: IUserType[] = [{ code: 1, description: 'Admin' }];
    const response: IUserTypeWithStatusCode = {
      status: 200,
      UserType: userType,
    };

    mockModel.find.mockResolvedValue(userType);

    const result = await repository.getAllUserType();

    expect(result).toEqual(response);
    results.push({
      route: 'Repository: getAllUserType',
      status: 'Passed',
    });
    expect(mockModel.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
  });

  it('should alter account status', async () => {
    const userType: IUserType = { code: 1, description: 'Admin' };
    const message: IMessage = {
      status: 201,
      message: 'Tipo de usuário atualizado com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(userType);
    mockModel.updateOne.mockResolvedValue(message);

    const result = await repository.alterUserType(1, userType);

    expect(result).toEqual(message);
    results.push({ route: 'Repository: alterUserType', status: 'Passed' });
    expect(mockModel.findOne).toHaveBeenCalledWith({ code: 1 });
    expect(mockModel.updateOne).toHaveBeenCalledWith(
      { code: 1 },
      { description: 'ADMIN' },
    );
  });

  it('should delete account status', async () => {
    const userType: IUserType = { code: 1, description: 'Admin' };
    const message: IMessage = {
      status: 201,
      message: 'Tipo de usuário excluido com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(userType);
    mockModel.deleteOne.mockResolvedValue(message);

    const result = await repository.deleteUserType(1);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteUserType',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({ code: 1 });
    expect(mockModel.deleteOne).toHaveBeenCalledWith({ code: 1 });
  });

  it('should return 404 if status does not exist', async () => {
    const message: IMessage = {
      status: 404,
      message: 'Tipo de usuário não existe, por favor verificar.',
    };

    mockModel.findOne.mockResolvedValue(null);

    const result = await repository.deleteUserType(1);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteUserType (Not Found)',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({ code: 1 });
  });
});
