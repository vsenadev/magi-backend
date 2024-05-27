import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/test-utils';
import { ProductService } from '../../service/Product.service';
import { ProductController } from '../../controller/Product.controller';
import {
  IProduct,
  IProductWithStatusCode,
} from '../../interface/Product.interface';
import { IMessage } from '../../interface/Message.interface';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;
  const results: TestResult[] = [];

  const mockService = {
    createProduct: jest.fn(),
    getAllProducts: jest.fn(),
    alterProduct: jest.fn(),
    deleteProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create product', async () => {
    const product: IProduct = {
      sku: '123',
      name: 'New Product',
      type: 'Type',
      value: 10.99,
      length: 10.99,
      width: 10.99,
      height: 10.99,
      idEmpresa: '2',
    };
    const message: IMessage = { status: 201, message: 'Success' };

    mockService.createProduct.mockResolvedValue(message);

    const result = await controller.createProduct(product);

    expect(result).toEqual(message);
    results.push({ route: 'POST /api/products', status: 'Passed' });
  });

  it('should get all products', async () => {
    const response: IProductWithStatusCode = {
      status: 200,
      products: [
        {
          sku: '123',
          name: 'Product',
          type: 'Type',
          value: 10.99,
          length: 10.99,
          width: 10.99,
          height: 10.99,
          idEmpresa: '2',
        },
      ],
    };

    mockService.getAllProducts.mockResolvedValue(response);

    const result = await controller.getAllProducts();

    expect(result).toEqual(response);
    results.push({ route: 'GET /api/products', status: 'Passed' });
  });

  it('should alter product', async () => {
    const product: IProduct = {
      sku: '123',
      name: 'Update Product',
      type: 'Type',
      value: 10.99,
      length: 10.99,
      width: 10.99,
      height: 10.99,
      idEmpresa: '2',
    };
    const message: IMessage = { status: 201, message: 'Updated' };

    mockService.alterProduct.mockResolvedValue(message);

    const result = await controller.alterProduct('123', product);

    expect(result).toEqual(message);
    results.push({
      route: 'PUT /api/products/sku/:sku',
      status: 'Passed',
    });
  });

  it('should delete product', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockService.deleteProduct.mockResolvedValue(message);

    const result = await controller.deleteProduct('123');

    expect(result).toEqual(message);
    results.push({
      route: 'DELETE /api/products/sku/:sku',
      status: 'Passed',
    });
  });
});
