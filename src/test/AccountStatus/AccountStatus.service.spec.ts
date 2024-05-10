import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/test-utils';
import { AccountStatusService } from '../../service/AccountStatus.service';
import { AccountStatusRepository } from '../../repository/AccountStatus.repository';
import {
  IAccountStatus,
  IAccountStatusWithStatusCode,
} from '../../interface/AccountStatus.interface';
import { IMessage } from '../../interface/Message.interface';

describe('AccountStatusService', () => {
  let service: AccountStatusService;
  let repository: AccountStatusRepository;
  const results: TestResult[] = [];

  const mockRepository = {
    createAccountStatus: jest.fn(),
    getAllAccountStatus: jest.fn(),
    alterAccountStatus: jest.fn(),
    deleteAccountStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountStatusService,
        {
          provide: AccountStatusRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AccountStatusService>(AccountStatusService);
    repository = module.get<AccountStatusRepository>(AccountStatusRepository);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create account status', async () => {
    const accountStatus: IAccountStatus = { code: 1, description: 'Active' };
    const message: IMessage = { status: 201, message: 'Success' };

    mockRepository.createAccountStatus.mockResolvedValue(message);

    const result = await service.createAccountStatus(accountStatus);

    expect(result).toEqual(message);
    results.push({ route: 'Service: createAccountStatus', status: 'Passed' });
  });

  it('should get all account statuses', async () => {
    const response: IAccountStatusWithStatusCode = {
      status: 200,
      AccountStatus: [{ code: 1, description: 'Active' }],
    };

    mockRepository.getAllAccountStatus.mockResolvedValue(response);

    const result = await service.getAllAccountStatus();

    expect(result).toEqual(response);
    results.push({ route: 'Service: getAllAccountStatus', status: 'Passed' });
  });

  it('should alter account status', async () => {
    const accountStatus: IAccountStatus = { code: 1, description: 'Inactive' };
    const message: IMessage = { status: 201, message: 'Updated' };

    mockRepository.alterAccountStatus.mockResolvedValue(message);

    const result = await service.alterAccountStatus(1, accountStatus);

    expect(result).toEqual(message);
    results.push({ route: 'Service: alterAccountStatus', status: 'Passed' });
  });

  it('should delete account status', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockRepository.deleteAccountStatus.mockResolvedValue(message);

    const result = await service.deleteAccountStatus(1);

    expect(result).toEqual(message);
    results.push({ route: 'Service: deleteAccountStatus', status: 'Passed' });
  });
});
