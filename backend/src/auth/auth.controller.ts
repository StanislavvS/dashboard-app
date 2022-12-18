import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { MongoExceptionFilter } from '../utils/mongo-exceptions.fillters';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UseFilters(new MongoExceptionFilter())
  async registerUser(@Body() user) {
    return this.authService.createUser(user);
  }

  @Patch('/edit-user/:id')
  async editUser(@Param('id') id: string, @Body() user) {
    const updateUser = await this.authService.updateUser(user, id);

    if (!updateUser) {
      throw new NotFoundException({ errorMessage: 'User not found' });
    }

    return updateUser;
  }
  @Delete('/delete-user/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.authService.deleteUser(id);

    if (!deletedUser) {
      throw new NotFoundException({ errorMessage: 'User not found' });
    }
  }
}
