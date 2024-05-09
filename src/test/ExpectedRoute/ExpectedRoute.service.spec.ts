import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedRouteService } from '../../service/ExpectedRoute.service';
import { ExpectedRouteRepository } from '../../repository/ExpectedRoute.repository';
import {
  IExpectedRoute,
  IExpectedRouteWithStatusCode,
} from '../../interface/ExpectedRoute.interface';
import { IMessage } from '../../interface/Message.interface';
import { TestResult, printResults } from '../test-utils';

describe('ExpectedRouteService', () => {
  let service: ExpectedRouteService;
  let repository: ExpectedRouteRepository;
  const results: TestResult[] = [];

  const mockRepository = {
    createExpectedRoute: jest.fn(),
    getAllExpectedRoutes: jest.fn(),
    alterExpectedRoute: jest.fn(),
    deleteExpectedRoute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpectedRouteService,
        {
          provide: ExpectedRouteRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ExpectedRouteService>(ExpectedRouteService);
    repository = module.get<ExpectedRouteRepository>(ExpectedRouteRepository);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create expected route', async () => {
    const route: IExpectedRoute = { latitude: 55.93, longitude: -3.118 };
    const message: IMessage = {
      status: 201,
      message: 'Expected route created successfully!',
    };

    mockRepository.createExpectedRoute.mockResolvedValue(message);

    const result = await service.createExpectedRoute(route);

    expect(result).toEqual(message);
    results.push({ route: 'Service: createExpectedRoute', status: 'Passed' });
  });

  it('should get all expected routes', async () => {
    const routes: IExpectedRouteWithStatusCode = {
      status: 200,
      expectedRoutes: [{ latitude: 55.93, longitude: -3.118 }],
    };

    mockRepository.getAllExpectedRoutes.mockResolvedValue(routes);

    const result = await service.getAllExpectedRoutes();

    expect(result).toEqual(routes);
    results.push({ route: 'Service: getAllExpectedRoutes', status: 'Passed' });
  });

  it('should alter expected route', async () => {
    const route: IExpectedRoute = { latitude: 55.93, longitude: -3.118 };
    const message: IMessage = {
      status: 201,
      message: 'Expected route updated successfully!',
    };

    mockRepository.alterExpectedRoute.mockResolvedValue(message);

    const result = await service.alterExpectedRoute(55.93, -3.118, route);

    expect(result).toEqual(message);
    results.push({ route: 'Service: alterExpectedRoute', status: 'Passed' });
  });

  it('should delete expected route', async () => {
    const message: IMessage = {
      status: 201,
      message: 'Expected route deleted successfully!',
    };

    mockRepository.deleteExpectedRoute.mockResolvedValue(message);

    const result = await service.deleteExpectedRoute(55.93, -3.118);

    expect(result).toEqual(message);
    results.push({ route: 'Service: deleteExpectedRoute', status: 'Passed' });
  });
});
