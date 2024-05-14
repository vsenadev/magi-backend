import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestResult, printResults } from '../../utils/test-utils';
import { ProductRepository } from '../../repository/Product.repository';
import { Product } from '../../model/Product.model';
import {
  IProduct,
  IProductWithStatusCode,
} from '../../interface/Product.interface';
import { IMessage } from '../../interface/Message.interface';

describe('ProductRepository', () => {
  let repository: ProductRepository;
  let model: Model<Product>;
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
        ProductRepository,
        {
          provide: getModelToken('Product'),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
    model = module.get<Model<Product>>(getModelToken('Product'));
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
      idEmpresa: "2"
    };
    const message: IMessage = {
      status: 201,
      message: 'Produto criado com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(null);
    mockModel.create.mockResolvedValue(message);

    const result = await repository.createProduct(product);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: createProduct',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      $or: [{ sku: product.sku }, { name: product.name }],
    });
    expect(mockModel.create).toHaveBeenCalledWith(product);
  });

  it('should get all products', async () => {
    const products: IProduct[] = [
      {
        sku: '12',
        name: 'Product',
        type: 'Type',
        value: 10.99,
        length: 10.99,
        width: 10.99,
        height: 10.99,
        idEmpresa: "2"
      },
    ];
    const response: IProductWithStatusCode = {
      status: 200,
      products: products,
    };

    mockModel.find.mockResolvedValue(products);

    const result = await repository.getAllProducts();

    expect(result).toEqual(response);
    results.push({
      route: 'Repository: getAllProducts',
      status: 'Passed',
    });
    expect(mockModel.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
  });

  it('should alter product', async () => {
    const product: IProduct = {
      sku: '12',
      name: 'Update Product',
      type: 'Type',
      value: 10.99,
      length: 10.99,
      width: 10.99,
      height: 10.99,
      idEmpresa: "2"
    };
    const message: IMessage = {
      status: 201,
      message: 'Produto atualizado com sucesso!',
    };

    mockModel.findOne.mockResolvedValue({ sku: '12' });
    mockModel.updateOne.mockResolvedValue(message);

    const result = await repository.alterProduct('12', product);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: alterProduct',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({ sku: '12' });
    expect(mockModel.updateOne).toHaveBeenCalledWith({ sku: '12' }, product);
  });

  it('should delete product', async () => {
    const product: IProduct = {
      sku: '12',
      name: 'Product',
      type: 'Type',
      value: 10.99,
      length: 10.99,
      width: 10.99,
      height: 10.99,
      idEmpresa: "2"
    };
    const message: IMessage = {
      status: 201,
      message: 'Produto excluído com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(product);
    mockModel.deleteOne.mockResolvedValue(message);

    const result = await repository.deleteProduct('123');

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteProduct',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({ sku: '123' });
    expect(mockModel.deleteOne).toHaveBeenCalledWith({ sku: '123' });
  });

  it('should return 404 if product does not exist', async () => {
    const message: IMessage = {
      status: 404,
      message: 'Produto não existe, por favor verificar.',
    };

    mockModel.findOne.mockResolvedValue(null);

    const result = await repository.deleteProduct('123');

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteProduct (Not Found)',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({ sku: '123' });
  });
});
