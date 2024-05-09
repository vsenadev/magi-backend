import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedRouteService } from '../../service/ExpectedRoute.service';
import { ExpectedRouteController } from '../../controller/ExpectedRoute.controller';
import {
  IExpectedRoute,
  IExpectedRouteWithStatusCode,
} from '../../interface/ExpectedRoute.interface';
import { IMessage } from '../../interface/Message.interface';
import { TestResult, printResults } from '../test-utils';

describe('ExpectedRouteController', () => {
  let controller: ExpectedRouteController;
  let service: ExpectedRouteService;
  const results: TestResult[] = [];

  const mockService = {
    createExpectedRoute: jest.fn(),
    getAllExpectedRoutes: jest.fn(),
    alterExpectedRoute: jest.fn(),
    deleteExpectedRoute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpectedRouteController],
      providers: [
        {
          provide: ExpectedRouteService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ExpectedRouteController>(ExpectedRouteController);
    service = module.get<ExpectedRouteService>(ExpectedRouteService);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create expected route', async () => {
    const route: IExpectedRoute = { latitude: 55.93, longitude: -3.118 };
    const message: IMessage = { status: 201, message: 'Success' };

    mockService.createExpectedRoute.mockResolvedValue(message);

    const result = await controller.createExpectedRoute(route);

    expect(result).toEqual(message);
    results.push({ route: 'POST /api/ExpectedRoutes', status: 'Passed' });
  });

  it('should get all expected routes', async () => {
    const response: IExpectedRouteWithStatusCode = {
      status: 200,
      expectedRoutes: [{ latitude: 55.93, longitude: -3.118 }],
    };

    mockService.getAllExpectedRoutes.mockResolvedValue(response);

    const result = await controller.getAllExpectedRoutes();

    expect(result).toEqual(response);
    results.push({ route: 'GET /api/ExpectedRoutes', status: 'Passed' });
  });

  it('should alter expected route', async () => {
    const route: IExpectedRoute = { latitude: 55.93, longitude: -3.118 };
    const message: IMessage = { status: 201, message: 'Updated' };

    mockService.alterExpectedRoute.mockResolvedValue(message);

    const result = await controller.alterExpectedRoute(55.93, -3.118, route);

    expect(result).toEqual(message);
    results.push({
      route: 'PUT /api/ExpectedRoutes/latitude/:latitude/longitude/:longitude',
      status: 'Passed',
    });
  });

  it('should delete expected route', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockService.deleteExpectedRoute.mockResolvedValue(message);

    const result = await controller.deleteExpectedRoute(55.93, -3.118);

    expect(result).toEqual(message);
    results.push({
      route: 'DELETE /api/ExpectedRoutes/latitude/:latitude/longitude/:longitude',
      status: 'Passed',
    });
  });
});
