import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService - Register', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should hash password when registering a user', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const user = await authService.register(email, password);

    expect(user.email).toBe(email);
    expect(user.password).not.toBe(password);
  });
});
