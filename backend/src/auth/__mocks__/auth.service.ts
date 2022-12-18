import { userStubOne } from '../test/stubs/user.stub';

export const AuthService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockResolvedValue(userStubOne()),
  updateUser: jest.fn().mockResolvedValue(userStubOne()),
  deleteUser: jest.fn().mockResolvedValue(userStubOne()),
});
