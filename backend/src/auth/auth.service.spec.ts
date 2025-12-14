import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AuthService - Register (DB)', () => {
  let authService: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.user.deleteMany();
  });

  it('should store user in database with hashed password', async () => {
    const email = 'dbtest@example.com';
    const password = 'password123';

    const user = await authService.register(email, password);

    const dbUser = await prisma.user.findUnique({
      where: { email },
    });

    expect(dbUser).toBeDefined();
    expect(dbUser?.email).toBe(email);
    expect(dbUser?.password).not.toBe(password);
  });
});
