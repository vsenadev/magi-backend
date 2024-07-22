import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/Test.utils';
import { UserTypeService } from '../../service/UserType.service';
import { UserTypeController } from '../../controller/UserType.controller';
import {
  IUserType,
  IUserTypeWithStatusCode,
} from '../../interface/UserType.interface';
import { IMessage } from '../../interface/Message.interface';

describe('UserTypeController', () => {
  let controller: UserTypeController;
  let service: UserTypeService;
  const results: TestResult[] = [];

  const mockService = {
    createUserType: jest.fn(),
    getAllUserType: jest.fn(),
    alterUserType: jest.fn(),
    deleteUserType: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTypeController],
      providers: [
        {
          provide: UserTypeService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UserTypeController>(UserTypeController);
    service = module.get<UserTypeService>(UserTypeService);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create user type', async () => {
    const userType: IUserType = { code: 1, description: 'Admin' };
    const message: IMessage = { status: 201, message: 'Success' };

    mockService.createUserType.mockResolvedValue(message);

    const result = await controller.createUserType(userType);

    expect(result).toEqual(message);
    results.push({ route: 'POST /api/usertype', status: 'Passed' });
  });

  it('should get all user types', async () => {
    const response: IUserTypeWithStatusCode = {
      status: 200,
      UserType: [{ code: 1, description: 'Admin' }],
    };

    mockService.getAllUserType.mockResolvedValue(response);

    const result = await controller.getAllUserType();

    expect(result).toEqual(response);
    results.push({ route: 'GET /api/usertype', status: 'Passed' });
  });

  it('should alter user type', async () => {
    const userType: IUserType = { code: 1, description: 'Guest' };
    const message: IMessage = { status: 201, message: 'Updated' };

    mockService.alterUserType.mockResolvedValue(message);

    const result = await controller.alterUserType(1, userType);

    expect(result).toEqual(message);
    results.push({
      route: 'PUT /api/usertype/code/:code',
      status: 'Passed',
    });
  });

  it('should delete user type', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockService.deleteUserType.mockResolvedValue(message);

    const result = await controller.deleteUserType(1);

    expect(result).toEqual(message);
    results.push({
      route: 'DELETE /api/usertype/code/:code',
      status: 'Passed',
    });
  });
});
