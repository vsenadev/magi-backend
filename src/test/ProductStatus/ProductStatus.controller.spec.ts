import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/Test.utils';
import { ProductStatusService } from '../../service/ProductStatus.service';
import { ProductStatusController } from '../../controller/ProductStatus.controller';
import {
  IProductStatus,
  IProductStatusWithStatusCode,
} from '../../interface/ProductStatus.interface';
import { IMessage } from '../../interface/Message.interface';

describe('ProductStatusController', () => {
  let controller: ProductStatusController;
  let service: ProductStatusService;
  const results: TestResult[] = [];

  const mockService = {
    createProductStatus: jest.fn(),
    getAllProductStatus: jest.fn(),
    alterProductStatus: jest.fn(),
    deleteProductStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductStatusController],
      providers: [
        {
          provide: ProductStatusService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductStatusController>(ProductStatusController);
    service = module.get<ProductStatusService>(ProductStatusService);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create Product status', async () => {
    const ProductStatus: IProductStatus = { code: 1, description: 'Active' };
    const message: IMessage = { status: 201, message: 'Success' };

    mockService.createProductStatus.mockResolvedValue(message);

    const result = await controller.createProductStatus(ProductStatus);

    expect(result).toEqual(message);
    results.push({ route: 'POST /api/Productstatus', status: 'Passed' });
  });

  it('should get all Product statuses', async () => {
    const response: IProductStatusWithStatusCode = {
      status: 200,
      productStatus: [{ code: 1, description: 'Active' }],
    };

    mockService.getAllProductStatus.mockResolvedValue(response);

    const result = await controller.getAllProductStatus();

    expect(result).toEqual(response);
    results.push({ route: 'GET /api/Productstatus', status: 'Passed' });
  });

  it('should alter Product status', async () => {
    const ProductStatus: IProductStatus = { code: 1, description: 'Inactive' };
    const message: IMessage = { status: 201, message: 'Updated' };

    mockService.alterProductStatus.mockResolvedValue(message);

    const result = await controller.alterProductStatus(1, ProductStatus);

    expect(result).toEqual(message);
    results.push({
      route: 'PUT /api/Productstatus/code/:code',
      status: 'Passed',
    });
  });

  it('should delete Product status', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockService.deleteProductStatus.mockResolvedValue(message);

    const result = await controller.deleteProductStatus(1);

    expect(result).toEqual(message);
    results.push({
      route: 'DELETE /api/Productstatus/code/:code',
      status: 'Passed',
    });
  });
});
