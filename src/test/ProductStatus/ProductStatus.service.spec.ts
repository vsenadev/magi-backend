import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/test-utils';
import { ProductStatusService } from '../../service/ProductStatus.service';
import { ProductStatusRepository } from '../../repository/ProductStatus.repository';
import {
  IProductStatus,
  IProductStatusWithStatusCode,
} from '../../interface/ProductStatus.interface';
import { IMessage } from '../../interface/Message.interface';

describe('ProductStatusService', () => {
  let service: ProductStatusService;
  let repository: ProductStatusRepository;
  const results: TestResult[] = [];

  const mockRepository = {
    createProductStatus: jest.fn(),
    getAllProductStatus: jest.fn(),
    alterProductStatus: jest.fn(),
    deleteProductStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductStatusService,
        {
          provide: ProductStatusRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductStatusService>(ProductStatusService);
    repository = module.get<ProductStatusRepository>(ProductStatusRepository);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create Product status', async () => {
    const ProductStatus: IProductStatus = { code: 1, description: 'Active' };
    const message: IMessage = { status: 201, message: 'Success' };

    mockRepository.createProductStatus.mockResolvedValue(message);

    const result = await service.createProductStatus(ProductStatus);

    expect(result).toEqual(message);
    results.push({ route: 'Service: createProductStatus', status: 'Passed' });
  });

  it('should get all Product statuses', async () => {
    const response: IProductStatusWithStatusCode = {
      status: 200,
      productStatus: [{ code: 1, description: 'Active' }],
    };

    mockRepository.getAllProductStatus.mockResolvedValue(response);

    const result = await service.getAllProductStatus();

    expect(result).toEqual(response);
    results.push({ route: 'Service: getAllProductStatus', status: 'Passed' });
  });

  it('should alter Product status', async () => {
    const ProductStatus: IProductStatus = { code: 1, description: 'Inactive' };
    const message: IMessage = { status: 201, message: 'Updated' };

    mockRepository.alterProductStatus.mockResolvedValue(message);

    const result = await service.alterProductStatus(1, ProductStatus);

    expect(result).toEqual(message);
    results.push({ route: 'Service: alterProductStatus', status: 'Passed' });
  });

  it('should delete Product status', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockRepository.deleteProductStatus.mockResolvedValue(message);

    const result = await service.deleteProductStatus(1);

    expect(result).toEqual(message);
    results.push({ route: 'Service: deleteProductStatus', status: 'Passed' });
  });
});
