import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegistrationDto {
  @Transform(({ value }) => value?.trim())
  @IsEmail()
  email: string;

  @Transform(({ value }) => value?.trim())
  @MinLength(6, { message: 'Пожалуйста введи в пароль больше 6 символов' })
  password: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  name: string;
}
