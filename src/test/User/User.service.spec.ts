import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../service/User.service';
import { UserRepository } from '../../repository/User.repository';
import { IUser } from '../../interface/User.interface';
import { IMessage } from '../../interface/Message.interface';
import { CompanyRepository } from '../../repository/Company.repository';

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
        {
          provide: CompanyRepository,
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
      telephone: '1234567890111',
      password: 'password',
      mail: 'john.doe@example.com',
      type: 1,
      status: 1,
    };
    const resultMessage: IMessage = {
      status: 201,
      message: 'User created successfully',
    };

    // Certifique-se de que o mock retorna um objeto com _id
    mockRepository.createUser.mockResolvedValue({
      ...resultMessage,
      _id: 'mocked_id', // Adicione uma propriedade _id para o teste
    });

    const result = await service.createUser(user);
    expect(result).toEqual(resultMessage);
  });

  // Outros testes permanecem os mesmos
});
