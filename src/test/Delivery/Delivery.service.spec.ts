import { Test, TestingModule } from '@nestjs/testing';
import { TestResult, printResults } from '../../utils/Test.utils';
import { DeliveryService } from '../../service/Delivery.service';
import { DeliveryRepository } from '../../repository/Delivery.repository';
import {
  IDelivery,
  IDeliveryWithStatusCode,
} from '../../interface/Delivery.interface';
import { IMessage } from '../../interface/Message.interface';

describe('DeliveryService', () => {
  let service: DeliveryService;
  let repository: DeliveryRepository;
  const results: TestResult[] = [];

  const mockRepository = {
    createDelivery: jest.fn(),
    getAllDeliveries: jest.fn(),
    alterDelivery: jest.fn(),
    deleteDelivery: jest.fn(),
    getExpectedRouteById: jest.fn(),
    saveTrackedRouteById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryService,
        {
          provide: DeliveryRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DeliveryService>(DeliveryService);
    repository = module.get<DeliveryRepository>(DeliveryRepository);
  });

  afterAll(() => {
    printResults(results);
  });

  it('should create delivery', async () => {
    const delivery: IDelivery = {
      _id: '123',
      name: 'New Delivery',
      sender: [],
      sendDate: '2024-05-10',
      expectedDate: '2024-05-15',
      status: 1,
      products: [],
      lockStatus: 0,
      expectedRoute: [],
      tracedRoute: [],
      startingAddress: 'Start',
      destination: 'Destination',
    };
    const message: IMessage = {
      status: 201,
      message: 'Entrega criada com sucesso!',
    };

    mockRepository.createDelivery.mockResolvedValue(message);

    const result = await service.createDelivery(delivery);

    expect(result).toEqual(message);
    results.push({ route: 'Service: createDelivery', status: 'Passed' });
  });

  it('should get all deliveries', async () => {
    const deliveries: IDeliveryWithStatusCode = {
      status: 200,
      deliveries: [
        {
          _id: '123',
          name: 'Delivery',
          sender: [],
          sendDate: '2024-05-10',
          expectedDate: '2024-05-15',
          status: 1,
          products: [],
          lockStatus: 0,
          expectedRoute: [],
          tracedRoute: [],
          startingAddress: 'Start',
          destination: 'Destination',
        },
      ],
    };

    mockRepository.getAllDeliveries.mockResolvedValue(deliveries);

    const result = await service.getAllDeliveries();

    expect(result).toEqual(deliveries);
    results.push({ route: 'Service: getAllDeliveries', status: 'Passed' });
  });

  it('should alter delivery', async () => {
    const delivery: IDelivery = {
      _id: '123',
      name: 'Updated Delivery',
      sender: [],
      sendDate: '2024-05-10',
      expectedDate: '2024-05-15',
      status: 1,
      products: [],
      lockStatus: 0,
      expectedRoute: [],
      tracedRoute: [],
      startingAddress: 'Start',
      destination: 'Destination',
    };
    const message: IMessage = {
      status: 201,
      message: 'Entrega atualizada com sucesso!',
    };

    mockRepository.alterDelivery.mockResolvedValue(message);

    const result = await service.alterDelivery('123', delivery);

    expect(result).toEqual(message);
    results.push({ route: 'Service: alterDelivery', status: 'Passed' });
  });

  it('should delete delivery', async () => {
    const message: IMessage = {
      status: 201,
      message: 'Entrega excluída com sucesso!',
    };

    mockRepository.deleteDelivery.mockResolvedValue(message);

    const result = await service.deleteDelivery('123');

    expect(result).toEqual(message);
    results.push({ route: 'Service: deleteDelivery', status: 'Passed' });
  });
});
