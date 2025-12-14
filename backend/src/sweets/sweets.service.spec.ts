import { Test, TestingModule } from '@nestjs/testing';
import { SweetsService } from './sweets.service';
import { SweetsRepository } from './sweets.repository';
import { PrismaService } from '../src/prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('SweetsService', () => {
  let service: SweetsService;
  let repository: SweetsRepository;

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    purchase: jest.fn(),
    restock: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SweetsService,
        {
          provide: SweetsRepository,
          useValue: mockRepository,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SweetsService>(SweetsService);
    repository = module.get<SweetsRepository>(SweetsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new sweet', async () => {
      const createDto = {
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 100,
      };

      const expectedSweet = {
        id: '1',
        ...createDto,
        createdAt: new Date(),
      };

      mockRepository.create.mockResolvedValue(expectedSweet);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedSweet);
      expect(mockRepository.create).toHaveBeenCalledWith({
        name: createDto.name,
        category: createDto.category,
        price: createDto.price,
        quantity: createDto.quantity,
      });
    });
  });

  describe('findAll', () => {
    it('should return all sweets', async () => {
      const expectedSweets = [
        { id: '1', name: 'Sweet 1', category: 'Candy', price: 1.99, quantity: 50, createdAt: new Date() },
        { id: '2', name: 'Sweet 2', category: 'Chocolate', price: 2.99, quantity: 30, createdAt: new Date() },
      ];

      mockRepository.findAll.mockResolvedValue(expectedSweets);

      const result = await service.findAll();

      expect(result).toEqual(expectedSweets);
      expect(mockRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a sweet by id', async () => {
      const expectedSweet = {
        id: '1',
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 100,
        createdAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(expectedSweet);

      const result = await service.findOne('1');

      expect(result).toEqual(expectedSweet);
      expect(mockRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if sweet not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('search', () => {
    it('should search sweets by filters', async () => {
      const filters = { name: 'chocolate', minPrice: 1, maxPrice: 5 };
      const expectedSweets = [
        { id: '1', name: 'Chocolate Bar', category: 'Chocolate', price: 2.99, quantity: 100, createdAt: new Date() },
      ];

      mockRepository.search.mockResolvedValue(expectedSweets);

      const result = await service.search(filters);

      expect(result).toEqual(expectedSweets);
      expect(mockRepository.search).toHaveBeenCalledWith(filters);
    });
  });

  describe('update', () => {
    it('should update a sweet', async () => {
      const updateDto = { name: 'Updated Name', price: 3.99 };
      const existingSweet = {
        id: '1',
        name: 'Original Name',
        category: 'Candy',
        price: 2.99,
        quantity: 50,
        createdAt: new Date(),
      };
      const updatedSweet = { ...existingSweet, ...updateDto };

      mockRepository.findById.mockResolvedValue(existingSweet);
      mockRepository.update.mockResolvedValue(updatedSweet);

      const result = await service.update('1', updateDto);

      expect(result).toEqual(updatedSweet);
      expect(mockRepository.update).toHaveBeenCalledWith('1', updateDto);
    });

    it('should throw NotFoundException if sweet not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.update('999', { name: 'New Name' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a sweet', async () => {
      const existingSweet = {
        id: '1',
        name: 'Sweet',
        category: 'Candy',
        price: 1.99,
        quantity: 50,
        createdAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(existingSweet);
      mockRepository.delete.mockResolvedValue(undefined);

      await service.remove('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if sweet not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('purchase', () => {
    it('should decrease quantity by 1', async () => {
      const existingSweet = {
        id: '1',
        name: 'Sweet',
        category: 'Candy',
        price: 1.99,
        quantity: 10,
        createdAt: new Date(),
      };
      const updatedSweet = { ...existingSweet, quantity: 9 };

      mockRepository.findById.mockResolvedValue(existingSweet);
      mockRepository.purchase.mockResolvedValue(updatedSweet);

      const result = await service.purchase('1');

      expect(result.quantity).toBe(9);
      expect(mockRepository.purchase).toHaveBeenCalledWith('1');
    });

    it('should throw BadRequestException if quantity is 0', async () => {
      const existingSweet = {
        id: '1',
        name: 'Sweet',
        category: 'Candy',
        price: 1.99,
        quantity: 0,
        createdAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(existingSweet);

      await expect(service.purchase('1')).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if sweet not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.purchase('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('restock', () => {
    it('should increase quantity', async () => {
      const existingSweet = {
        id: '1',
        name: 'Sweet',
        category: 'Candy',
        price: 1.99,
        quantity: 10,
        createdAt: new Date(),
      };
      const updatedSweet = { ...existingSweet, quantity: 60 };

      mockRepository.findById.mockResolvedValue(existingSweet);
      mockRepository.restock.mockResolvedValue(updatedSweet);

      const result = await service.restock('1', 50);

      expect(result.quantity).toBe(60);
      expect(mockRepository.restock).toHaveBeenCalledWith('1', 50);
    });

    it('should throw NotFoundException if sweet not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.restock('999', 10)).rejects.toThrow(NotFoundException);
    });
  });
});

