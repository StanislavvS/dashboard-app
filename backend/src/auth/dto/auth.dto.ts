import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsEmail(undefined, { message: 'Not a valid e-mail' })
  email: string;
}

export type EditUserDto = Partial<CreateUserDto>;
