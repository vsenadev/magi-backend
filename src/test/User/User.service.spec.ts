import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../service/User.service';
import { UserRepository } from '../../repository/User.repository';
import { IUser, IUserWithStatusCode } from '../../interface/User.interface';
import { IMessage } from '../../interface/Message.interface';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  const mockRepository = {
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    alterUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
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
    const resultMessage: IMessage = {
      status: 201,
      message: 'User created successfully',
    };

    mockRepository.createUser.mockResolvedValue(resultMessage);

    const result = await service.createUser(user);
    expect(result).toEqual(resultMessage);
  });

  it('should get all users', async () => {
    const users: IUserWithStatusCode = {
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

    mockRepository.getAllUsers.mockResolvedValue(users);
    const result = await service.getAllUsers();
    expect(result).toEqual(users);
  });

  it('should handle user update', async () => {
    const user: IUser = {
      name: 'Updated John',
      id_company: '123456789012345678901234',
      cpf: '123.456.789-01',
      telephone: '12345678901',
      password: 'newpassword',
      mail: 'updated.john@example.com',
      type: 1,
      status: 1,
    };
    const resultMessage: IMessage = {
      status: 200,
      message: 'User updated successfully',
    };

    mockRepository.alterUser.mockResolvedValue(resultMessage);
    const result = await service.alterUser('1', user);
    expect(result).toEqual(resultMessage);
  });

  it('should delete a user', async () => {
    const resultMessage: IMessage = {
      status: 204,
      message: 'User deleted successfully',
    };

    mockRepository.deleteUser.mockResolvedValue(resultMessage);
    const result = await service.deleteUser('1');
    expect(result).toEqual(resultMessage);
  });
});
