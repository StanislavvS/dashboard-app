import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { CreateUserDto, EditUserDto } from '../dto/auth.dto';
import { User } from '../schemas/auth.schema';
import { userOneId, userStubOne } from './stubs/user.stub';

jest.mock('../auth.service.ts');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let user: User;
  let createUserDto: CreateUserDto;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  describe('creteUser', () => {
    describe('when createUser is called', () => {
      beforeEach(async () => {
        createUserDto = {
          email: userStubOne().email,
          login: userStubOne().login,
          password: userStubOne().password,
        };

        user = await authController.registerUser(createUserDto);
      });

      test('then it should call authService', () => {
        expect(authService.createUser).toHaveBeenCalledWith({
          email: userStubOne().email,
          login: userStubOne().login,
          password: userStubOne().password,
        });
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStubOne());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called, ', () => {
      let updateUserDto: EditUserDto;

      beforeEach(async () => {
        updateUserDto = {
          login: userStubOne().login,
        };
        user = await authController.editUser(
          userOneId.toString(),
          updateUserDto.login,
        );
      });
      test('then it should call usersService', () => {
        expect(authService.updateUser).toHaveBeenCalledWith(
          updateUserDto.login,
          userOneId.toString(),
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStubOne());
      });
    });
  });
  describe('deleteUser', () => {
    beforeEach(async () => {
      await authController.deleteUser(userOneId.toString());
    });
    test('then it should call usersService', () => {
      expect(authService.deleteUser).toHaveBeenCalledWith(userOneId.toString());
    });
  });
});
