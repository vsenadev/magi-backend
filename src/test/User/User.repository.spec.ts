import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../repository/User.repository';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../model/User.model';

describe('UserRepository', () => {
  let repository: UserRepository;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          // Aqui você deve fornecer o nome do modelo como string diretamente
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  it('should create a user if not exists', async () => {
    mockUserModel.findOne.mockResolvedValue(null);
    mockUserModel.create.mockResolvedValue({
      status: 201,
      message: 'User created successfully',
    });

    const result = await repository.createUser({
      name: 'John Doe',
      id_company: '123456789012345678901234',
      cpf: '123.456.789-01',
      telephone: '12345678901',
      password: 'password',
      mail: 'john.doe@example.com',
      type: 1,
      status: 1,
    });
    expect(result).toEqual({
      status: 201,
      message: 'User created successfully',
    });
  });

  it('should return error if user exists', async () => {
    mockUserModel.findOne.mockResolvedValue(true);
    const result = await repository.createUser({
      name: 'John Doe',
      id_company: '123456789012345678901234',
      cpf: '123.456.789-01',
      telephone: '12345678901',
      password: 'password',
      mail: 'john.doe@example.com',
      type: 1,
      status: 1,
    });
    expect(result).toEqual({
      status: 409,
      message: 'Usuário já existe, por favor verificar.',
    });
  });

  it('should handle user update', async () => {
    mockUserModel.findOne.mockResolvedValue(true);
    mockUserModel.updateOne.mockResolvedValue({
      status: 201,
      message: 'User updated successfully',
    });

    const result = await repository.alterUser('1', {
      name: 'Updated John',
      id_company: '123456789012345678901234',
      cpf: '123.456.789-01',
      telephone: '12345678901',
      password: 'newpassword',
      mail: 'updated.john@example.com',
      type: 1,
      status: 1,
    });
    expect(result).toEqual({
      status: 201,
      message: 'User updated successfully',
    });
  });

  it('should handle user deletion', async () => {
    mockUserModel.findOne.mockResolvedValue(true);
    mockUserModel.deleteOne.mockResolvedValue({
      status: 204,
      message: 'User deleted successfully',
    });

    const result = await repository.deleteUser('1');
    expect(result).toEqual({
      status: 201,
      message: 'User deleted successfully',
    });
  });
});
