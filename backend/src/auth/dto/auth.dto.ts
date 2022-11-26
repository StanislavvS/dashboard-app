import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
}

export type EditUserDto = Partial<CreateUserDto>;
