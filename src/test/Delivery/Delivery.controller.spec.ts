import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/test-utils';
import { DeliveryService } from '../../service/Delivery.service';
import { DeliveryController } from '../../controller/Delivery.controller';
import {
  IDelivery,
  IDeliveryWithStatusCode,
} from '../../interface/Delivery.interface';
import { IMessage } from '../../interface/Message.interface';

describe('DeliveryController', () => {
  let controller: DeliveryController;
  let service: DeliveryService;
  const results: TestResult[] = [];

  const mockService = {
    createDelivery: jest.fn(),
    getAllDeliveries: jest.fn(),
    alterDelivery: jest.fn(),
    deleteDelivery: jest.fn(),
    getExpectedRoute: jest.fn(),
    saveTrackedRoute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [
        {
          provide: DeliveryService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DeliveryController>(DeliveryController);
    service = module.get<DeliveryService>(DeliveryService);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create delivery type', async () => {
    const delivery: IDelivery = {
      _id: '123',
      name: 'Delivery 1',
      sender: [{ _id: '1' }],
      sendDate: '2024-05-10T12:00:00Z',
      expectedDate: '2024-05-15T12:00:00Z',
      status: 1,
      products: [{ _id: '2' }],
      lockStatus: 1,
      expectedRoute: [
        { latitude: 'lat1', longitude: 'long1' },
        { latitude: 'lat2', longitude: 'long2' },
      ],
      tracedRoute: [
        { latitude: 'lat3', longitude: 'long3' },
        { latitude: 'lat4', longitude: 'long4' },
      ],
      startingAddress: 'Starting Address',
      destination: 'Destination Address',
    };
    const message: IMessage = { status: 201, message: 'Success' };

    mockService.createDelivery.mockResolvedValue(message);

    const result = await controller.createDeliveryType(delivery);

    expect(result).toEqual(message);
    results.push({ route: 'POST /api/delivery', status: 'Passed' });
  });

  it('should get all delivery types', async () => {
    const response: IDeliveryWithStatusCode = {
      status: 200,
      deliveries: [
        {
          _id: '123',
          name: 'Delivery 1',
          sender: [{ _id: '1' }],
          sendDate: '2024-05-10T12:00:00Z',
          expectedDate: '2024-05-15T12:00:00Z',
          status: 1,
          products: [{ _id: '2' }],
          lockStatus: 1,
          expectedRoute: [
            { latitude: 'lat1', longitude: 'long1' },
            { latitude: 'lat2', longitude: 'long2' },
          ],
          tracedRoute: [
            { latitude: 'lat3', longitude: 'long3' },
            { latitude: 'lat4', longitude: 'long4' },
          ],
          startingAddress: 'Starting Address',
          destination: 'Destination Address',
        },
      ],
    };

    mockService.getAllDeliveries.mockResolvedValue(response);

    const result = await controller.getAllDeliveryType();

    expect(result).toEqual(response);
    results.push({ route: 'GET /api/delivery', status: 'Passed' });
  });

  it('should alter delivery type', async () => {
    const delivery: IDelivery = {
      _id: '123',
      name: 'Delivery 1',
      sender: [{ _id: '1' }],
      sendDate: '2024-05-10T12:00:00Z',
      expectedDate: '2024-05-15T12:00:00Z',
      status: 1,
      products: [{ _id: '2' }],
      lockStatus: 1,
      expectedRoute: [
        { latitude: 'lat1', longitude: 'long1' },
        { latitude: 'lat2', longitude: 'long2' },
      ],
      tracedRoute: [
        { latitude: 'lat3', longitude: 'long3' },
        { latitude: 'lat4', longitude: 'long4' },
      ],
      startingAddress: 'Starting Address',
      destination: 'Destination Address',
    };
    const message: IMessage = { status: 201, message: 'Updated' };

    mockService.alterDelivery.mockResolvedValue(message);

    const result = await controller.alterDeliveryType('123', delivery);

    expect(result).toEqual(message);
    results.push({
      route: 'PUT /api/delivery/id/:id',
      status: 'Passed',
    });
  });

  it('should delete delivery type', async () => {
    const message: IMessage = { status: 201, message: 'Deleted' };

    mockService.deleteDelivery.mockResolvedValue(message);

    const result = await controller.deleteDeliveryType('123');

    expect(result).toEqual(message);
    results.push({
      route: 'DELETE /api/delivery/id/:id',
      status: 'Passed',
    });
  });

  it('should get expected route for a delivery', async () => {
    const expectedRoute = [
      { latitude: 'lat1', longitude: 'long1' },
      { latitude: 'lat2', longitude: 'long2' }
    ];
    const response = { status: 200, expectedRoute: expectedRoute };
  
    mockService.getExpectedRoute.mockResolvedValue(response);
  
    const result = await controller.getExpectedRoute('123');
  
    expect(result).toEqual(response);
    results.push({
      route: 'GET /api/delivery/:id/expected-route',
      status: 'Passed',
    });
  });
  
  it('should save tracked route for a delivery', async () => {
    const trackedRoute = '[{"latitude":"lat3","longitude":"long3"},{"latitude":"lat4","longitude":"long4"}]';
    const message: IMessage = { status: 201, message: 'Tracked route saved' };
  
    mockService.saveTrackedRoute.mockResolvedValue(message);
  
    const result = await controller.saveTrackedRoute('123', trackedRoute);
  
    expect(result).toEqual(message);
    results.push({
      route: 'POST /api/delivery/:id/track-route',
      status: 'Passed',
    });
  });
  
});
