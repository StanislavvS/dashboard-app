import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/auth.schema';
import { CreateUserDto, EditUserDto } from './dto/auth.dto';
import { UsersRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  async updateUser(updateUserDto: EditUserDto, _id: string): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ _id }, updateUserDto);
  }

  async deleteUser(_id: string): Promise<boolean> {
    return this.usersRepository.findOneAndDelete({ _id });
  }
}
