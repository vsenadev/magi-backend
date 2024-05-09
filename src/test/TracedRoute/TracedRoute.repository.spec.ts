import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestResult, printResults } from '../test-utils';
import {
  ITracedRoute,
  ITracedRouteWithStatusCode,
} from '../../interface/TracedRoute.interface';
import { IMessage } from '../../interface/Message.interface';

import { TracedRouteRepository } from '../../repository/TracedRoute.repository';
import { TracedRoute } from '../../model/TracedRoute.model';
import { ExpectedRoute, createExpectedRoute } from '../../model/ExpectedRoute';

describe('TracedRouteRepository', () => {
  let repository: TracedRouteRepository;
  let model: Model<TracedRoute>;
  const results: TestResult[] = [];

  const mockModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  const geolocation: ExpectedRoute = createExpectedRoute(55.93, -3.118);


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TracedRouteRepository,
        {
          provide: getModelToken('TracedRoute'),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<TracedRouteRepository>(TracedRouteRepository);
    model = module.get<Model<TracedRoute>>(getModelToken('TracedRoute'));
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create traced route', async () => {
    const route: ITracedRoute = { destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation };
    const message: IMessage = {
      status: 201,
      message: 'rota criada com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(null);
    mockModel.create.mockResolvedValue(undefined);

    const result = await repository.createTracedRoute(route);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: createTracedRoute',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      $or: [{ destiny: 'Rua Souza Aparecido' }, { departure: 'Av José Carlos Lima' } , { geolocation: geolocation }],
    });
    expect(mockModel.create).toHaveBeenCalledWith(route);
  });

  it('should get all expected routes', async () => {
    const routes: ITracedRoute[] = [{ destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation }];
    const response: ITracedRouteWithStatusCode = {
      status: 200,
      tracedRoutes: routes,
    };

    mockModel.find.mockResolvedValue(routes);

    const result = await repository.getAllTracedRoutes();

    expect(result).toEqual(response);
    results.push({
      route: 'Repository: getAllTracedRoutes',
      status: 'Passed',
    });
    expect(mockModel.find).toHaveBeenCalledWith({}, { _id: 0, __v: 0 });
  });

  it('should alter expected route', async () => {
    const route: ITracedRoute = { destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation };
    const message: IMessage = {
      status: 201,
      message: 'Rota traçada atualizada com sucesso!',
    };

    mockModel.findOne.mockResolvedValue({ destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation });
    mockModel.updateOne.mockResolvedValue(undefined);

    const result = await repository.alterTracedRoute('Rua Souza Aparecido', 'Av José Carlos Lima', geolocation);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: alterTracedRoute',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      destiny: 'Rua Souza Aparecido',
      departure: 'Av José Carlos Lima',
      geolocation: geolocation
    });
    expect(mockModel.updateOne).toHaveBeenCalledWith(
      { destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation },
      route,
    );
  });

  it('should delete expected route', async () => {
    const route: ITracedRoute = { destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation };
    const message: IMessage = {
      status: 201,
      message: 'Rota traçada excluída com sucesso!',
    };

    mockModel.findOne.mockResolvedValue(route);
    mockModel.deleteOne.mockResolvedValue(undefined);

    const result = await repository.deleteTracedRoute('Rua Souza Aparecido', 'Av José Carlos Lima', geolocation);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteTracedRoute',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      destiny: 'Rua Souza Aparecido',
      departure: 'Av José Carlos Lima',
      geolocation: geolocation
    });
    expect(mockModel.deleteOne).toHaveBeenCalledWith({
      destiny: 'Rua Souza Aparecido',
      departure: 'Av José Carlos Lima',
      geolocation: geolocation
    });
  });

  it('should return 404 if expected route does not exist', async () => {
    const message: IMessage = {
      status: 404,
      message: 'Esta rota não existe, por favor verificar.',
    };

    mockModel.findOne.mockResolvedValue(null);

    const result = await repository.deleteTracedRoute('Rua Souza Aparecido', 'Av José Carlos Lima', geolocation);

    expect(result).toEqual(message);
    results.push({
      route: 'Repository: deleteTracedRoute (Not Found)',
      status: 'Passed',
    });
    expect(mockModel.findOne).toHaveBeenCalledWith({
      destiny: 'Rua Souza Aparecido',
      departure: 'Av José Carlos Lima',
      geolocation: geolocation
    });
  });
});
