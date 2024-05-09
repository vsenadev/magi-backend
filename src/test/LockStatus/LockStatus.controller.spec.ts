import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../test-utils';
import { LockStatusService } from '../../service/LockStatus.service';
import { LockStatusController } from '../../controller/LockStatus.controller';
import { IMessage } from '../../interface/Message.interface';
import { ILockStatus } from '../../interface/LockStatus.interface';

describe('LockStatusController', () => {
  let controller: LockStatusController;
  let service: LockStatusService;
  const results: TestResult[] = [];

  const mockService = {
    createLockStatus: jest.fn(),
    alterLockStatus: jest.fn(),
    deleteLockStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LockStatusController],
      providers: [
        {
          provide: LockStatusService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<LockStatusController>(LockStatusController);
    service = module.get<LockStatusService>(LockStatusService);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create lock status', async () => {
    const lockStatus: ILockStatus = { code: 123, description: 'teste' };
    const message: IMessage = { status: 201, message: 'Success' };

    mockService.createLockStatus.mockResolvedValue(message);

    const result = await controller.createLockStatus(lockStatus);

    expect(result).toEqual(message);
    results.push({ route: 'POST /api/lockstatus', status: 'Passed' });
  });

  it('should alter lock status', async () => {
    const lockStatus: ILockStatus = { code: 123, description: 'teste' };
    const message: IMessage = { status: 201, message: 'Updated' };

    mockService.alterLockStatus.mockResolvedValue(message);

    const result = await controller.alterLockStatus(123, lockStatus);

    expect(result).toEqual(message);
    results.push({
      route: 'PUT /api/lockstatus/code/:code',
      status: 'Passed',
    });
  });

  it('should delete lock status', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockService.deleteLockStatus.mockResolvedValue(message);

    const result = await controller.deleteLockStatus(123);

    expect(result).toEqual(message);
    results.push({
      route: 'DELETE /api/lockstatus/code/:code',
      status: 'Passed',
    });
  });
});
