import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto<S extends string = string> {
  @IsString()
  @IsNotEmpty()
  name: S;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: S;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: S;
}
