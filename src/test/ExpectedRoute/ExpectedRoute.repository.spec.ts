import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestResult, printResults } from '../test-utils';
import { ExpectedRouteRepository } from '../../repository/ExpectedRoute.repository';
import {
  IExpectedRoute,
  IExpectedRouteWithStatusCode,
} from '../../interface/ExpectedRoute.interface';
import { IMessage } from '../../interface/Message.interface';
import { ExpectedRoute } from '../../model/ExpectedRoute';

describe('ExpectedRouteRepository', () => {
  let repository: ExpectedRouteRepository;
  let model: Model<ExpectedRoute>;
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
        ExpectedRouteRepository,
        {
          provide: getModelToken('ExpectedRoute'),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<ExpectedRouteRepository>(ExpectedRouteRepository);
    model = module.get<Model<ExpectedRoute>>(getModelToken('ExpectedRoute'));
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create expected route', async () => {
    const route: IExpectedRoute = { latitude: 55.93, longitude: -3.118 };
    const message: IMessage = {
      status: 201,
      message: 'Rota Esperada criada com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(null);
    mockModel.create.mockResolvedValue(undefined);

    const result = await repository.createExpectedRoute(route);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: createExpectedRoute',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      $or: [{ latitude: 55.93 }, { longitude: -3.118 }],
    });
    expect(mockModel.create).toHaveBeenCalledWith(route);
  });

  it('should get all expected routes', async () => {
    const routes: IExpectedRoute[] = [{ latitude: 55.93, longitude: -3.118 }];
    const response: IExpectedRouteWithStatusCode = {
      status: 200,
      expectedRoutes: routes,
    };

    mockModel.find.mockResolvedValue(routes);

    const result = await repository.getAllExpectedRoutes();

    expect(result).toEqual(response);
    results.push({
      route: 'Repository: getAllExpectedRoutes',
      status: 'Passed',
    });
    expect(mockModel.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
  });

  it('should alter expected route', async () => {
    const route: IExpectedRoute = { latitude: 55.93, longitude: -3.118 };
    const message: IMessage = {
      status: 201,
      message: 'Rota Esperada atualizada com sucesso!',
    };

    mockModel.findOne.mockResolvedValue({ latitude: 55.93, longitude: -3.118 });
    mockModel.updateOne.mockResolvedValue(undefined);

    const result = await repository.alterExpectedRoute(55.93, -3.118, route);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: alterExpectedRoute',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      latitude: 55.93,
      longitude: -3.118,
    });
    expect(mockModel.updateOne).toHaveBeenCalledWith(
      { latitude: 55.93, longitude: -3.118 },
      route,
    );
  });

  it('should delete expected route', async () => {
    const route: IExpectedRoute = { latitude: 55.93, longitude: -3.118 };
    const message: IMessage = {
      status: 201,
      message: 'Rota Esperada excluída com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(route);
    mockModel.deleteOne.mockResolvedValue(undefined);

    const result = await repository.deleteExpectedRoute(55.93, -3.118);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteExpectedRoute',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      latitude: 55.93,
      longitude: -3.118,
    });
    expect(mockModel.deleteOne).toHaveBeenCalledWith({
      latitude: 55.93,
      longitude: -3.118,
    });
  });

  it('should return 404 if expected route does not exist', async () => {
    const message: IMessage = {
      status: 404,
      message: 'Esta rota não existe, por favor verificar.',
    };

    mockModel.findOne.mockResolvedValue(null);

    const result = await repository.deleteExpectedRoute(55.93, -3.118);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteExpectedRoute (Not Found)',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      latitude: 55.93,
      longitude: -3.118,
    });
  });
});
