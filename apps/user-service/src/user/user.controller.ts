import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { IUser, RegistrationDto } from '@home-servers/shared';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern({ cmd: 'registration' })
  async createUser(userData: RegistrationDto) {
    try {
    } catch {
      throw new RpcException({
        statusCode: 400,
        message: 'Ошибка регистрации',
      });
    }
  }
}
