// auth/test/mocks.ts
import { User } from '@prisma/client';

export const getMockUser = (): User => ({
  id: 'user-id',
  email: 'test@example.com',
  firstName: 'Test User',
  lastName: 'Test',
  hash: 'test-hash',
  pseudo: 'test-pseudo',
  city: 'test-city',
  age: 10,
  isActive: true,
  created_at: new Date(),
  updated_at: new Date(),
  roleId: 'user',
  dollarAvailables: 1000,
});
