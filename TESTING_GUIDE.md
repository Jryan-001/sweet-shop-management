# 🧪 Testing Guide

## Overview

This project follows **Test-Driven Development (TDD)** principles with comprehensive test coverage.

## Test Structure

```
backend/
├── src/
│   ├── auth/
│   │   └── auth.service.spec.ts    # Auth service tests
│   ├── sweets/
│   │   └── sweets.service.spec.ts  # Sweets service tests
│   └── app.controller.spec.ts      # App controller tests
└── test/
    └── app.e2e-spec.ts              # End-to-end tests
```

## Running Tests

### 1. Unit Tests

Run all unit tests:
```bash
cd backend
npm test
```

### 2. Watch Mode (TDD)

Run tests in watch mode for TDD:
```bash
npm run test:watch
```

### 3. Test Coverage

Generate coverage report:
```bash
npm run test:cov
```

This will create a `coverage/` directory with detailed HTML reports.

### 4. E2E Tests

Run end-to-end tests:
```bash
npm run test:e2e
```

## Test Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: All API endpoints
- **E2E Tests**: Critical user flows

## Test Examples

### Auth Service Tests

```typescript
describe('AuthService', () => {
  describe('register', () => {
    it('should register a new user with hashed password', async () => {
      // RED → GREEN → REFACTOR
    });

    it('should throw error if user already exists', async () => {
      // Test error handling
    });
  });

  describe('login', () => {
    it('should return token for valid credentials', async () => {
      // Test successful login
    });

    it('should throw error for invalid credentials', async () => {
      // Test error handling
    });
  });
});
```

### Sweets Service Tests

```typescript
describe('SweetsService', () => {
  describe('create', () => {
    it('should create a new sweet', async () => {
      // Test creation
    });
  });

  describe('purchase', () => {
    it('should decrease quantity by 1', async () => {
      // Test purchase logic
    });

    it('should throw error if out of stock', async () => {
      // Test stock validation
    });
  });

  describe('restock', () => {
    it('should increase quantity', async () => {
      // Test restock logic
    });
  });
});
```

## TDD Workflow

### Red-Green-Refactor Cycle

1. **RED** 🔴: Write a failing test
   ```bash
   npm test
   # Test fails ❌
   ```

2. **GREEN** 🟢: Write minimal code to pass
   ```bash
   npm test
   # Test passes ✅
   ```

3. **REFACTOR** 🔵: Improve code quality
   ```bash
   npm test
   # Test still passes ✅
   ```

## Test Reports

### Generate HTML Coverage Report

```bash
npm run test:cov
```

Open `coverage/lcov-report/index.html` in browser to view detailed coverage.

### Coverage Metrics

- **Statements**: % of code statements executed
- **Branches**: % of conditional branches tested
- **Functions**: % of functions called
- **Lines**: % of code lines executed

## Continuous Integration

Tests should run automatically on:
- Every commit
- Every pull request
- Before deployment

## Best Practices

1. ✅ Write tests BEFORE implementation (TDD)
2. ✅ Test one thing per test case
3. ✅ Use descriptive test names
4. ✅ Follow AAA pattern (Arrange, Act, Assert)
5. ✅ Mock external dependencies
6. ✅ Test edge cases and error scenarios
7. ✅ Keep tests fast and independent

## Test Naming Convention

```typescript
describe('ServiceName', () => {
  describe('methodName', () => {
    it('should [expected behavior] when [condition]', () => {
      // Test implementation
    });
  });
});
```

## Mocking

### Mock Prisma Service

```typescript
const mockPrismaService = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  sweet: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
};
```

### Mock JWT Service

```typescript
const mockJwtService = {
  sign: jest.fn().mockReturnValue('mock-token'),
  verify: jest.fn().mockReturnValue({ sub: 'user-id' }),
};
```

## Debugging Tests

### Run specific test file

```bash
npm test -- auth.service.spec.ts
```

### Run tests with debugging

```bash
npm run test:debug
```

Then attach your debugger to the Node process.

## Test Data

Use consistent test data:

```typescript
const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  password: 'hashedPassword',
  role: 'USER',
};

const mockSweet = {
  id: 'test-sweet-id',
  name: 'Test Sweet',
  category: 'Chocolate',
  price: 2.99,
  quantity: 10,
};
```

## Expected Test Results

### All Tests Should Pass ✅

```
PASS  src/auth/auth.service.spec.ts
PASS  src/sweets/sweets.service.spec.ts
PASS  src/app.controller.spec.ts
PASS  test/app.e2e-spec.ts

Test Suites: 4 passed, 4 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        5.123 s
```

### Coverage Report

```
File                | % Stmts | % Branch | % Funcs | % Lines
--------------------|---------|----------|---------|--------
All files           |   85.23 |    78.45 |   90.12 |   86.34
 auth/              |   92.15 |    85.71 |   95.00 |   93.22
 sweets/            |   88.76 |    82.35 |   91.67 |   89.45
 common/            |   75.43 |    65.22 |   80.00 |   76.89
```

## Troubleshooting

### Tests fail with database errors

1. Ensure test database is configured
2. Use in-memory database for tests
3. Mock Prisma service properly

### Tests are slow

1. Use mocks instead of real database
2. Run tests in parallel
3. Optimize test setup/teardown

### Coverage is low

1. Add tests for uncovered branches
2. Test error scenarios
3. Test edge cases

## Next Steps

1. ✅ Run all tests: `npm test`
2. ✅ Check coverage: `npm run test:cov`
3. ✅ Review coverage report
4. ✅ Add missing tests
5. ✅ Commit with test results

---

**Remember**: Tests are documentation. Write them clearly! 📝
