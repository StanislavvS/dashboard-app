import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/auth.schema';
import { UserModel } from '../support/user.model';

export const userOneId = new mongoose.Types.ObjectId();

export const userOne = {
  _id: userOneId,
  login: 'Stachu',
  password: '!Stasiu1996',
  email: 'sstanislaw85@gmail.com',
};

export const userStubOne = (): User => {
  return userOne;
};

export const userTwoId = new mongoose.Types.ObjectId();

export const userTwo = {
  _id: userTwoId,
  login: 'Stachu2',
  password: '!Stasiu1996',
  email: 'ssstanislaw85@gmail.com',
};

export const userStubTwo = (): User => {
  return userTwo;
};
