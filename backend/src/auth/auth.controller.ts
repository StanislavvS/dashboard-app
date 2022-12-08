import {
  Body,
  Controller,
  Delete,
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
    return this.authService.updateUser(user, id);
  }
  @Delete('/delete-user/:id')
  async deleteUser(@Param('id') id: string) {
    await this.authService.deleteUser(id);
  }
}
