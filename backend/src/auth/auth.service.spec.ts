import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AuthService - Register', () => {
  let authService: AuthService;

  const mockPrisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should hash password and store user', async () => {
    const email = 'test@example.com';
    const password = 'password123';
  
    const mockUser = {
      id: '123',
      email,
      role: 'USER',
      createdAt: new Date(),
    };
  
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue(mockUser);
  
    const result = await authService.register(email, password);
  
    expect(result.user.email).toBe(email);
    expect(result.user.id).toBe(mockUser.id);
    expect(result.token).toBe('mock-token');
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email },
    });
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        email,
        password: expect.any(String),
      }),
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  });

});