import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/Test.utils';
import { UserTypeService } from '../../service/UserType.service';
import { UserTypeRepository } from '../../repository/UsertType.repository';
import {
  IUserType,
  IUserTypeWithStatusCode,
} from '../../interface/UserType.interface';
import { IMessage } from '../../interface/Message.interface';

describe('UserTypeService', () => {
  let service: UserTypeService;
  let repository: UserTypeRepository;
  const results: TestResult[] = [];

  const mockRepository = {
    createUserType: jest.fn(),
    getAllUserType: jest.fn(),
    alterUserType: jest.fn(),
    deleteUserType: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTypeService,
        {
          provide: UserTypeRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserTypeService>(UserTypeService);
    repository = module.get<UserTypeRepository>(UserTypeRepository);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create user type', async () => {
    const userType: IUserType = { code: 1, description: 'Admin' };
    const message: IMessage = { status: 201, message: 'Success' };

    mockRepository.createUserType.mockResolvedValue(message);

    const result = await service.createUserType(userType);

    expect(result).toEqual(message);
    results.push({ route: 'Service: createUserType', status: 'Passed' });
  });

  it('should get all user types', async () => {
    const response: IUserTypeWithStatusCode = {
      status: 200,
      UserType: [{ code: 1, description: 'Admin' }],
    };

    mockRepository.getAllUserType.mockResolvedValue(response);

    const result = await service.getAllUserType();

    expect(result).toEqual(response);
    results.push({ route: 'Service: getAllUserType', status: 'Passed' });
  });

  it('should alter user type', async () => {
    const userType: IUserType = { code: 1, description: 'Guest' };
    const message: IMessage = { status: 201, message: 'Updated' };

    mockRepository.alterUserType.mockResolvedValue(message);

    const result = await service.alterUserType(1, userType);

    expect(result).toEqual(message);
    results.push({ route: 'Service: alterUserType', status: 'Passed' });
  });

  it('should delete user type', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockRepository.deleteUserType.mockResolvedValue(message);

    const result = await service.deleteUserType(1);

    expect(result).toEqual(message);
    results.push({ route: 'Service: deleteUserType', status: 'Passed' });
  });
});
