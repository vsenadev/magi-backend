import { Test, TestingModule } from '@nestjs/testing';
import { LockStatusService } from '../../service/LockStatus.service';
import { LockStatusRepository } from '../../repository/LockStatus.repository';
import { ILockStatus } from '../../interface/LockStatus.interface';
import { IMessage } from '../../interface/Message.interface';

describe('LockStatusService', () => {
  let service: LockStatusService;
  let repository: LockStatusRepository;

  const mockRepository = {
    createLockStatus: jest.fn(),
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

  it('should create lock status', async () => {
    const lockStatus: ILockStatus = { code: 123, description: 'locked' };
    const message: IMessage = {
      status: 201,
      message: 'Lock status created successfully!',
    };

    mockRepository.createLockStatus.mockResolvedValue(message);

    const result = await service.createLockStatus(lockStatus);

    expect(result).toEqual(message);
  });

  it('should alter lock status', async () => {
    const lockStatus: ILockStatus = { code: 123, description: 'unlocked' };
    const message: IMessage = {
      status: 201,
      message: 'Lock status updated successfully!',
    };

    mockRepository.alterLockStatus.mockResolvedValue(message);

    const result = await service.alterLockStatus(123, lockStatus);

    expect(result).toEqual(message);
  });

  it('should delete lock status', async () => {
    const message: IMessage = {
      status: 201,
      message: 'Lock status deleted successfully!',
    };

    mockRepository.deleteLockStatus.mockResolvedValue(message);

    const result = await service.deleteLockStatus(123);

    expect(result).toEqual(message);
  });
});
