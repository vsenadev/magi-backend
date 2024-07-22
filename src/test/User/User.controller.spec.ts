import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../controller/User.controller';
import { UserService } from '../../service/User.service';
import { TestResult, printResults } from '../../utils/Test.utils';
import { IUser, IUserWithStatusCode } from '../../interface/User.interface';
import { IMessage } from '../../interface/Message.interface';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  const results: TestResult[] = [];

  const mockService = {
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    alterUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create a user', async () => {
    const user: IUser = {
      name: 'John Doe',
      id_company: '123456789012345678901234',
      cpf: '123.456.789-01',
      telephone: '12345678901',
      password: 'password',
      mail: 'john.doe@example.com',
      type: 1,
      status: 1,
    };
    const message: IMessage = {
      status: 201,
      message: 'User created successfully',
    };

    mockService.createUser.mockResolvedValue(message);

    const result = await controller.createUser(user);

    expect(result).toEqual(message);
    results.push({ route: 'POST /api/user', status: 'Passed' });
  });

  it('should get all users', async () => {
    const response: IUserWithStatusCode = {
      status: 200,
      users: [
        {
          name: 'John Doe',
          id_company: '123456789012345678901234',
          cpf: '123.456.789-01',
          telephone: '12345678901',
          password: 'password',
          mail: 'john.doe@example.com',
          type: 1,
          status: 1,
        },
      ],
    };

    mockService.getAllUsers.mockResolvedValue(response);

    const result = await controller.getAllUsers();

    expect(result).toEqual(response);
    results.push({ route: 'GET /api/user', status: 'Passed' });
  });

  it('should alter a user', async () => {
    const user: IUser = {
      name: 'John Updated',
      id_company: '123456789012345678901234',
      cpf: '123.456.789-01',
      telephone: '12345678901',
      password: 'password',
      mail: 'john.doe@example.com',
      type: 1,
      status: 1,
    };
    const message: IMessage = {
      status: 200,
      message: 'User updated successfully',
    };

    mockService.alterUser.mockResolvedValue(message);

    const result = await controller.alterUser('1', user);

    expect(result).toEqual(message);
    results.push({ route: 'PUT /api/user/id/:id', status: 'Passed' });
  });

  it('should delete a user', async () => {
    const message: IMessage = {
      status: 204,
      message: 'User deleted successfully',
    };

    mockService.deleteUser.mockResolvedValue(message);

    const result = await controller.deleteUser('1');

    expect(result).toEqual(message);
    results.push({ route: 'DELETE /api/user/id/:id', status: 'Passed' });
  });
});
