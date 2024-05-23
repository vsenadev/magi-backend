import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/test-utils';
import { AccountStatusService } from '../../service/AccountStatus.service';
import { AccountStatusController } from '../../controller/AccountStatus.controller';
import {
  IAccountStatus,
  IAccountStatusWithStatusCode,
} from '../../interface/AccountStatus.interface';
import { IMessage } from '../../interface/Message.interface';

describe('AccountStatusController', () => {
  let controller: AccountStatusController;
  let service: AccountStatusService;
  const results: TestResult[] = [];

  const mockService = {
    createAccountStatus: jest.fn(),
    getAllAccountStatus: jest.fn(),
    alterAccountStatus: jest.fn(),
    deleteAccountStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountStatusController],
      providers: [
        {
          provide: AccountStatusService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AccountStatusController>(AccountStatusController);
    service = module.get<AccountStatusService>(AccountStatusService);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create account status', async () => {
    const accountStatus: IAccountStatus = { code: 1, description: 'Active' };
    const message: IMessage = { status: 201, message: 'Success' };

    mockService.createAccountStatus.mockResolvedValue(message);

    const result = await controller.createAccountStatus(accountStatus);

    expect(result).toEqual(message);
    results.push({ route: 'POST /api/accountstatus', status: 'Passed' });
  });

  it('should get all account statuses', async () => {
    const response: IAccountStatusWithStatusCode = {
      status: 200,
      AccountStatus: [{ code: 1, description: 'Active' }],
    };

    mockService.getAllAccountStatus.mockResolvedValue(response);

    const result = await controller.getAllAccountStatus();

    expect(result).toEqual(response);
    results.push({ route: 'GET /api/accountstatus', status: 'Passed' });
  });

  it('should alter account status', async () => {
    const accountStatus: IAccountStatus = { code: 1, description: 'Inactive' };
    const message: IMessage = { status: 201, message: 'Updated' };

    mockService.alterAccountStatus.mockResolvedValue(message);

    const result = await controller.alterAccountStatus(1, accountStatus);

    expect(result).toEqual(message);
    results.push({
      route: 'PUT /api/accountstatus/code/:code',
      status: 'Passed',
    });
  });

  it('should delete account status', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockService.deleteAccountStatus.mockResolvedValue(message);

    const result = await controller.deleteAccountStatus(1);

    expect(result).toEqual(message);
    results.push({
      route: 'DELETE /api/accountstatus/code/:code',
      status: 'Passed',
    });
  });
});
