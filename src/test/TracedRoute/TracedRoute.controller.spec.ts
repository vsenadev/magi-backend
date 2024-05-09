import { Test, TestingModule } from '@nestjs/testing';
import { TracedRouteService } from '../../service/TracedRoute.service';
import { TracedRouteController } from '../../controller/TracedRoute.controller';
import {
  ITracedRoute,
  ITracedRouteWithStatusCode,
} from '../../interface/TracedRoute.interface';
import { IMessage } from '../../interface/Message.interface';
import { TestResult, printResults } from '../test-utils';
import { ExpectedRoute, createExpectedRoute } from '../../model/ExpectedRoute';

describe('TracedRouteController', () => {
  let controller: TracedRouteController;
  let service: TracedRouteService;
  const results: TestResult[] = [];

  const mockService = {
    createTracedRoute: jest.fn(),
    getAllTracedRoutes: jest.fn(),
    alterTracedRoute: jest.fn(),
    deleteTracedRoute: jest.fn(),
  };

const geolocation: ExpectedRoute = createExpectedRoute(55.93, -3.118);

beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracedRouteController],
      providers: [
        {
          provide: TracedRouteService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TracedRouteController>(TracedRouteController);
    service = module.get<TracedRouteService>(TracedRouteService);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create traced route', async () => {
    const route: ITracedRoute = { destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation };
    const message: IMessage = { status: 201, message: 'Success' };
    mockService.createTracedRoute.mockResolvedValue(message);

    // Act
    const result = await controller.createTracedRoute(route);

    // Assert
    expect(result).toEqual(message);
    results.push({ route: 'POST /api/TracedRoutes', status: 'Passed' });
  });

  it('should get all traced routes', async () => {
    // Arrange
    const response: ITracedRouteWithStatusCode = {
      status: 200,
      tracedRoutes: [{ destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation }],
    };
    mockService.getAllTracedRoutes.mockResolvedValue(response);

    // Act
    const result = await controller.getAllTracedRoutes();

    // Assert
    expect(result).toEqual(response);
    results.push({ route: 'GET /api/TracedRoutes', status: 'Passed' });
  });

  it('should alter traced route', async () => {
    const route: ITracedRoute = { destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation};
    const message: IMessage = { status: 201, message: 'Updated' };
    mockService.alterTracedRoute.mockResolvedValue(message);

    const result = await controller.alterTracedRoute('Rua Souza Aparecido', 'Av José Carlos Lima', geolocation, route);

    expect(result).toEqual(message);
    results.push({
      route: 'PUT /api/TracedRoutes/destiny/:destiny/departure/:departure/geolocation/:geolocation',
      status: 'Passed',
    });
  });

  it('should delete traced route', async () => {
    const route: ITracedRoute = { destiny: 'Rua Souza Aparecido', departure: 'Av José Carlos Lima', geolocation: geolocation};
    const message: IMessage = { status: 201, message: 'Deleted' };
    mockService.deleteTracedRoute.mockResolvedValue(message);

    // Act
    const result = await controller.deleteTracedRoute('Rua Souza Aparecido', 'Av José Carlos Lima', geolocation, route);

    // Assert
    expect(result).toEqual(message);
    results.push({
      route: 'DELETE /api/TracedRoutes/destiny/:destiny/departure/:departure/geolocation/:geolocation',
      status: 'Passed',
    });
  });
});
