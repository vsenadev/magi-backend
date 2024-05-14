import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestResult, printResults } from '../../utils/test-utils';
import { ProductStatusRepository } from '../../repository/ProductStatus.repository';
import { ProductStatus } from '../../model/ProductStatus.model';
import {
  IProductStatus,
  IProductStatusWithStatusCode,
} from '../../interface/ProductStatus.interface';
import { IMessage } from '../../interface/Message.interface';

describe('ProductStatusRepository', () => {
  let repository: ProductStatusRepository;
  let model: Model<ProductStatus>;
  const results: TestResult[] = [];

  const mockModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductStatusRepository,
        {
          provide: getModelToken('ProductStatus'),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<ProductStatusRepository>(ProductStatusRepository);
    model = module.get<Model<ProductStatus>>(getModelToken('ProductStatus'));
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create Product status', async () => {
    const ProductStatus: IProductStatus = { code: 1, description: 'Active' };
    const message: IMessage = {
      status: 201,
      message: 'Status do produto criado com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(null);
    mockModel.create.mockResolvedValue(message);

    const result = await repository.createProductStatus(ProductStatus);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: createProductStatus',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      $or: [{ code: ProductStatus.code }, { description: 'ACTIVE' }],
    });
    expect(mockModel.create).toHaveBeenCalledWith({
      code: ProductStatus.code,
      description: 'ACTIVE',
    });
  });

  it('should get all Product statuses', async () => {
    const ProductStatuses: IProductStatus[] = [
      { code: 1, description: 'Active' },
    ];
    const response: IProductStatusWithStatusCode = {
      status: 200,
      productStatus: ProductStatuses,
    };

    mockModel.find.mockResolvedValue(ProductStatuses);

    const result = await repository.getAllProductStatus();

    expect(result).toEqual(response);
    results.push({
      route: 'Repository: getAllProductStatus',
      status: 'Passed',
    });
    expect(mockModel.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
  });

  it('should alter Product status', async () => {
    const ProductStatus: IProductStatus = { code: 1, description: 'Inactive' };
    const message: IMessage = {
      status: 201,
      message: 'Status do produto atualizado com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(ProductStatus);
    mockModel.updateOne.mockResolvedValue(message);

    const result = await repository.alterProductStatus(1, ProductStatus);

    expect(result).toEqual(message);
    results.push({ route: 'Repository: alterProductStatus', status: 'Passed' });
    expect(mockModel.findOne).toHaveBeenCalledWith({ code: 1 });
    expect(mockModel.updateOne).toHaveBeenCalledWith(
      { code: 1 },
      { description: 'INACTIVE' },
    );
  });

  it('should delete Product status', async () => {
    const ProductStatus: IProductStatus = { code: 1, description: 'Active' };
    const message: IMessage = {
      status: 201,
      message: 'Status do produto excluido com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(ProductStatus);
    mockModel.deleteOne.mockResolvedValue(message);

    const result = await repository.deleteProductStatus(1);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteProductStatus',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({ code: 1 });
    expect(mockModel.deleteOne).toHaveBeenCalledWith({ code: 1 });
  });

  it('should return 404 if status does not exist', async () => {
    const message: IMessage = {
      status: 404,
      message: 'Status do produto não existe, por favor verificar.',
    };

    mockModel.findOne.mockResolvedValue(null);

    const result = await repository.deleteProductStatus(1);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteProductStatus (Not Found)',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({ code: 1 });
  });
});
