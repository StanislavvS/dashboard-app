import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/auth.schema';
import { CreateUserDto, EditUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async updateUser(updateUserDto: EditUserDto, id: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );
    if (!updatedUser) {
      throw new NotFoundException({ errorMessage: 'User not found' });
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const removedUser = await this.userModel.findByIdAndDelete(id);
    if (!removedUser) {
      throw new NotFoundException({ errorMessage: 'User not found' });
    }
    return removedUser;
  }
}
