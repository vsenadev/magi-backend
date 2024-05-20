import { Test, TestingModule } from '@nestjs/testing';
import { LockStatusService } from '../../service/LockStatus.service';
import { LockStatusRepository } from '../../repository/LockStatus.repository';
import {
  ILockStatus,
  ILockStatusWithStatusCode,
} from '../../interface/LockStatus.interface';
import { IMessage } from '../../interface/Message.interface';
import { TestResult, printResults } from '../../utils/test-utils';

describe('LockStatusService', () => {
  let service: LockStatusService;
  let repository: LockStatusRepository;
  const results: TestResult[] = [];

  const mockRepository = {
    createLockStatus: jest.fn(),
    getAllLockStatus: jest.fn(),
    alterLockStatus: jest.fn(),
    deleteLockStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LockStatusService,
        {
          provide: LockStatusRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LockStatusService>(LockStatusService);
    repository = module.get<LockStatusRepository>(LockStatusRepository);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create lock status', async () => {
    const lockStatus: ILockStatus = { code: 1, description: 'Locked' };
    const message: IMessage = { status: 201, message: 'Success' };

    mockRepository.createLockStatus.mockResolvedValue(message);

    const result = await service.createLockStatus(lockStatus);

    expect(result).toEqual(message);
    results.push({ route: 'Service: createLockStatus', status: 'Passed' });
  });

  it('should get all lock statuses', async () => {
    const response: ILockStatusWithStatusCode = {
      status: 200,
      LockStatus: [{ code: 1, description: 'Locked' }],
    };

    mockRepository.getAllLockStatus.mockResolvedValue(response);

    const result = await service.getAllLockStatus();

    expect(result).toEqual(response);
    results.push({ route: 'Service: getAllLockStatus', status: 'Passed' });
  });

  it('should alter lock status', async () => {
    const lockStatus: ILockStatus = { code: 1, description: 'Unlocked' };
    const message: IMessage = { status: 201, message: 'Updated' };

    mockRepository.alterLockStatus.mockResolvedValue(message);

    const result = await service.alterLockStatus(1, lockStatus);

    expect(result).toEqual(message);
    results.push({ route: 'Service: alterLockStatus', status: 'Passed' });
  });

  it('should delete lock status', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockRepository.deleteLockStatus.mockResolvedValue(message);

    const result = await service.deleteLockStatus(1);

    expect(result).toEqual(message);
    results.push({ route: 'Service: deleteLockStatus', status: 'Passed' });
  });
});
