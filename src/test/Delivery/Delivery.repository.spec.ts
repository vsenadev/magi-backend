import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DeliveryRepository } from '../../repository/Delivery.repository';
import { IMessage } from '../../interface/Message.interface';
import { v4 as uuidv4 } from 'uuid';
import { IDelivery } from '../../interface/Delivery.interface';

// Mock uuidv4
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('DeliveryRepository', () => {
  let repository: DeliveryRepository;

  const mockDeliveryModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
    getExpectedRouteById: jest.fn(),
    saveTrackedRouteById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryRepository,
        {
          provide: getModelToken('Delivery'),
          useValue: mockDeliveryModel,
        },
      ],
    }).compile();

    repository = module.get<DeliveryRepository>(DeliveryRepository);
  });

  it('should create a delivery', async () => {
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
        { latitude: 7447, longitude: 7544 },
        { latitude: 7678, longitude: 7986 },
      ],
      tracedRoute: [
        { latitude: 9372, longitude: 7030 },
        { latitude: 8642, longitude: 7093 },
      ],
      startingAddress: 'Starting Address',
      destination: 'Destination Address',
    };
    const existingDelivery = null;

    mockDeliveryModel.findOne.mockResolvedValue(existingDelivery);
    mockDeliveryModel.create.mockResolvedValue({});

    // Configure o mock para uuidv4 para retornar um ID previsível
    const mockUuid = 'mock-uuid';
    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

    const result: IMessage = await repository.createDelivery(delivery);

    // Capture os argumentos passados para a função mockada
    const mockCreateCallArgs = mockDeliveryModel.create.mock.calls[0][0];

    expect(mockCreateCallArgs).toEqual({
      _id: mockUuid,
      name: delivery.name.toUpperCase(),
      sender: delivery.sender,
      sendDate: delivery.sendDate,
      expectedDate: delivery.expectedDate,
      status: delivery.status,
      products: delivery.products,
      lockStatus: delivery.lockStatus,
      expectedRoute: delivery.expectedRoute,
      tracedRoute: delivery.tracedRoute,
      startingAddress: delivery.startingAddress,
      destination: delivery.destination,
    });
    expect(result).toEqual({
      status: 201,
      message: 'Entrega criada com sucesso!',
    });
  });

  it('should get all deliveries', async () => {
    const deliveries = [
      {
        name: 'Example Delivery',
        sender: 'Example Sender',
        sendDate: new Date(),
        expectedDate: new Date(),
        status: 'pending',
        products: [],
        lockStatus: false,
        expectedRoute: [],
        tracedRoute: [],
        startingAddress: 'Example Starting Address',
        destination: 'Example Destination',
      },
    ];

    mockDeliveryModel.find.mockResolvedValue(deliveries);

    const result = await repository.getAllDeliveries();

    expect(result).toEqual({ status: 200, deliveries: deliveries });
  });

  it('should alter a delivery', async () => {
    const _id = '1';
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
        { latitude: 3443, longitude: 84892 },
        { latitude: 2323, longitude: 3983 },
      ],
      tracedRoute: [
        { latitude: 3231, longitude: 2928 },
        { latitude: 8638, longitude: 3982 },
      ],
      startingAddress: 'Starting Address',
      destination: 'Destination Address',
    };
    const existingDelivery = { _id: _id };

    mockDeliveryModel.findOne.mockResolvedValue(existingDelivery);
    mockDeliveryModel.updateOne.mockResolvedValue({});

    const result: IMessage = await repository.alterDelivery(_id, delivery);

    expect(mockDeliveryModel.findOne).toBeCalledWith({ _id: _id });
    expect(mockDeliveryModel.updateOne).toBeCalledWith(
      { _id: _id },
      {
        name: delivery.name.toUpperCase(),
        sender: delivery.sender,
        sendDate: delivery.sendDate,
        expectedDate: delivery.expectedDate,
        status: delivery.status,
        products: delivery.products,
        lockStatus: delivery.lockStatus,
        expectedRoute: delivery.expectedRoute,
        tracedRoute: delivery.tracedRoute,
        startingAddress: delivery.startingAddress,
        destination: delivery.destination,
      },
    );
    expect(result).toEqual({
      status: 201,
      message: 'Entrega atualizada com sucesso!',
    });
  });

  it('should delete a delivery', async () => {
    const _id = '1';
    const existingDelivery = { _id: _id };

    mockDeliveryModel.findOne.mockResolvedValue(existingDelivery);
    mockDeliveryModel.deleteOne.mockResolvedValue({});

    const result: IMessage = await repository.deleteDelivery(_id);

    expect(mockDeliveryModel.findOne).toBeCalledWith({ _id: _id });
    expect(mockDeliveryModel.deleteOne).toBeCalledWith({ _id: _id });
    expect(result).toEqual({
      status: 201,
      message: 'Entrega excluída com sucesso!',
    });
  });
});
