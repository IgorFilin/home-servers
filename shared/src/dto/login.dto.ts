import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @Transform(({ value }) => value?.trim())
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Transform(({ value }) => value?.trim())
  @MinLength(6, { message: 'Пожалуйста введи в пароль больше 6 символов' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsUUID()
  deviceId: string;
}
