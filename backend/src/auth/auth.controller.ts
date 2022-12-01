import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() user) {
    return this.authService.createUser(user);
  }

  @Patch('/edit-user/:id')
  async editUser(@Param('id') id: string, @Body() user) {
    return this.authService.updateUser(user, id);
  }
  @Delete('/delete-user/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}
