import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DeliveryRepository } from '../../repository/Delivery.repository';
import { IMessage } from '../../interface/Message.interface';
import { Delivery } from '../../model/Delivery.model';

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
    const delivery = {
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
    const existingDelivery = null;

    mockDeliveryModel.findOne.mockResolvedValue(existingDelivery);
    mockDeliveryModel.create.mockResolvedValue({});

    const result: IMessage = await repository.createDelivery(delivery);

    expect(mockDeliveryModel.findOne).toBeCalledWith({ _id: delivery._id });
    expect(mockDeliveryModel.create).toBeCalledWith({
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
    const delivery = {
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

  it('should get expected route for a delivery', async () => {
    const id = '1';
    const expectedRoute = { status: 200, expectedRoute: '' };
    
    mockDeliveryModel.getExpectedRouteById.mockResolvedValue(expectedRoute);
    
    const result = await repository.getExpectedRouteById(id);
    
    expect(result).toEqual(expectedRoute);
  });
  
  it('should save tracked route for a delivery', async () => {
    const id = '1';
    const trackedRoute = 'Tracked Route';
    const message = { status: 201, message: 'Rota traçada salva com sucesso!'};
    
    mockDeliveryModel.saveTrackedRouteById.mockResolvedValue(message);
    
    const result = await repository.saveTrackedRouteById(id, trackedRoute);
    
    expect(result).toEqual(message);
  });
  
});
