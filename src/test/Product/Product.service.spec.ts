import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/test-utils';
import { ProductService } from '../../service/Product.service';
import { ProductRepository } from '../../repository/Product.repository';
import {
  IProduct,
  IProductWithStatusCode,
} from '../../interface/Product.interface';
import { IMessage } from '../../interface/Message.interface';

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;
  const results: TestResult[] = [];

  const mockRepository = {
    createProduct: jest.fn(),
    getAllProducts: jest.fn(),
    alterProduct: jest.fn(),
    deleteProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create product', async () => {
    const product: IProduct = {
      sku: '12',
      name: 'New Product',
      type: 'Type',
      value: 10.99,
      length: 10.99,
      width: 10.99,
      height: 10.99,
      idEmpresa: '2',
    };
    const message: IMessage = {
      status: 201,
      message: 'Produto criado com sucesso!',
    };

    mockRepository.createProduct.mockResolvedValue(message);

    const result = await service.createProduct(product);

    expect(result).toEqual(message);
    results.push({ route: 'Service: createProduct', status: 'Passed' });
  });

  it('should get all products', async () => {
    const products: IProductWithStatusCode = {
      status: 200,
      products: [
        {
          sku: '12',
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

    mockRepository.getAllProducts.mockResolvedValue(products);

    const result = await service.getAllProducts();

    expect(result).toEqual(products);
    results.push({ route: 'Service: getAllProducts', status: 'Passed' });
  });

  it('should alter product', async () => {
    const product: IProduct = {
      name: 'Update Product',
      type: 'Type',
      value: 10.99,
      length: 10.99,
      width: 10.99,
      height: 10.99,
      idEmpresa: '2',
    };
    const message: IMessage = {
      status: 201,
      message: 'Produto atualizado com sucesso!',
    };

    mockRepository.alterProduct.mockResolvedValue(message);

    const result = await service.alterProduct('12', product);

    expect(result).toEqual(message);
    results.push({ route: 'Service: alterProduct', status: 'Passed' });
  });

  it('should delete product', async () => {
    const message: IMessage = {
      status: 201,
      message: 'Produto excluído com sucesso!',
    };

    mockRepository.deleteProduct.mockResolvedValue(message);

    const result = await service.deleteProduct('123');

    expect(result).toEqual(message);
    results.push({ route: 'Service: deleteProduct', status: 'Passed' });
  });
});
