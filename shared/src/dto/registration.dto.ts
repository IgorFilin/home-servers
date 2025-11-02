import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegistrationDto {
  @Transform(({ value }) => value?.trim())
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => value?.trim())
  @MinLength(6, { message: 'Пожалуйста введи в пароль больше 6 символов' })
  @IsNotEmpty()
  password: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  name: string;
}
