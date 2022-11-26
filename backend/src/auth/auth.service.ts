import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/auth.schema';
import { CreateUserDto, EditUserDto } from './dto/auth.dto';
import { response, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async updateUser(updateUserDto: EditUserDto, id: string): Promise<User> {
    const updatedUser = await this.userModel.findById(id);
    const updates = Object.keys(updateUserDto);

    updates.forEach((update) => (updatedUser[update] = updateUserDto[update]));

    return (await updatedUser).save();
  }
}
