import { Test, TestingModule } from '@nestjs/testing';
import { TracedRouteService } from '../../service/TracedRoute.service';
import { TracedRouteRepository } from '../../repository/TracedRoute.repository';
import {
  ITracedRoute,
  ITracedRouteWithStatusCode,
} from '../../interface/TracedRoute.interface';
import { IMessage } from '../../interface/Message.interface';
import { TestResult, printResults } from '../test-utils';
import { ExpectedRoute, createExpectedRoute } from '../../model/ExpectedRoute';

describe('TracedRouteService', () => {
  let service: TracedRouteService;
  let repository: TracedRouteRepository;
  const results: TestResult[] = [];

  const mockRepository = {
    createTracedRoute: jest.fn(),
    getAllTracedRoutes: jest.fn(),
    alterTracedRoute: jest.fn(),
    deleteTracedRoute: jest.fn(),
  };

  const geolocation: ExpectedRoute = createExpectedRoute(55.93, -3.118);


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TracedRouteService,
        {
          provide: TracedRouteRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TracedRouteService>(TracedRouteService);
    repository = module.get<TracedRouteRepository>(TracedRouteRepository);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create traced route', async () => {
    const route: ITracedRoute = { destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation };
    const message: IMessage = {
      status: 201,
      message: 'Traced route created successfully!',
    };

    mockRepository.createTracedRoute.mockResolvedValue(message);

    const result = await service.createTracedRoute(route);

    expect(result).toEqual(message);
    results.push({ route: 'Service: createTracedRoute', status: 'Passed' });
  });

  it('should get all traced routes', async () => {
    const routes: ITracedRouteWithStatusCode = {
      status: 200,
      tracedRoutes: [{ destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation }],
    };

    mockRepository.getAllTracedRoutes.mockResolvedValue(routes);

    const result = await service.getAllTracedRoutes();

    expect(result).toEqual(routes);
    results.push({ route: 'Service: getAllTracedRoutes', status: 'Passed' });
  });

  it('should alter traced route', async () => {
    const route: ITracedRoute = { destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation };
    const message: IMessage = {
      status: 201,
      message: 'Traced route updated successfully!',
    };

    mockRepository.alterTracedRoute.mockResolvedValue(message);

    const result = await service.alterTracedRoute('123', '456', geolocation, route);

    expect(result).toEqual(message);
    results.push({ route: 'Service: alterTracedRoute', status: 'Passed' });
  });

  it('should delete traced route', async () => {
    const message: IMessage = {
      status: 201,
      message: 'Traced route deleted successfully!',
    };

    mockRepository.deleteTracedRoute.mockResolvedValue(message);

    const result = await service.deleteTracedRoute('Rua Souza Aparecido', 'Av José Carlos Lima', geolocation);

    expect(result).toEqual(message);
    results.push({ route: 'Service: deleteTracedRoute', status: 'Passed' });
  });
});
