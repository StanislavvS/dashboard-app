import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { User } from '../schemas/auth.schema';
import { UsersRepository } from '../auth.repository';
import { UserModel } from './support/user.model';
import { userOneId, userStubOne } from './stubs/user.stub';

describe('AuthRepository', () => {
  let usersRepository: UsersRepository;

  describe('find operations', () => {
    let userModel: UserModel;
    let userFilterQuery: FilterQuery<User>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(User.name),
            useClass: UserModel,
          },
        ],
      }).compile();

      usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
      userModel = moduleRef.get<UserModel>(getModelToken(User.name));

      userFilterQuery = {
        _id: userOneId.toJSON(),
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOne');
          user = await usersRepository.findOne(userFilterQuery);
        });

        test('then it should call the userModel', () => {
          expect(userModel.findOne).toHaveBeenCalledWith(userFilterQuery, {
            _id: 0,
            __v: 0,
          });
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStubOne());
        });
      });
    });

    describe('find', () => {
      describe('when find is called', () => {
        let users: User[];

        beforeEach(async () => {
          jest.spyOn(userModel, 'find');
          users = await usersRepository.find(userFilterQuery);
        });

        test('then it should call the userModel', () => {
          expect(userModel.find).toHaveBeenCalledWith(userFilterQuery);
        });

        test('then it should return a user', () => {
          expect(users).toEqual([userStubOne()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOneAndUpdate');
          user = await usersRepository.findOneAndUpdate(
            userFilterQuery,
            userStubOne(),
          );
        });

        test('then it should call the userModel', () => {
          expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
            userFilterQuery,
            userStubOne(),
            { new: true },
          );
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStubOne());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(User.name),
            useValue: UserModel,
          },
        ],
      }).compile();

      usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let user: User;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(UserModel.prototype, 'save');
          constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
          user = await usersRepository.create(userStubOne());
        });

        test('then it should call the userModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(userStubOne());
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStubOne());
        });
      });
    });
  });
});
