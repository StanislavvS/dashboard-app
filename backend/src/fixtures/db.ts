import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/auth.schema';

const userOneId = new mongoose.Types.ObjectId();
declare const UserModel: Model<UserDocument>;

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

export const setupDatabase = async () => {
  await UserModel.deleteMany();
  await new UserModel(userOne).save();
  await new UserModel(userTwo).save();
};
