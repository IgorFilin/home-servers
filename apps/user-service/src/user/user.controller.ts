import { Controller, Res } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';

import {
  ERROR_EXEPTION,
  LoginDto,
  RegistrationDto,
} from '@home-servers/shared';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern({ cmd: 'registration' })
  async createUser(userData: RegistrationDto) {
    try {
      const res = await this.userService.createUser(userData);
      return res;
    } catch (error) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: 400,
        message: ERROR_EXEPTION.REGISTRATION,
      });
    }
  }

  @MessagePattern({ cmd: 'login' })
  async loginUser(userData: LoginDto) {
    try {
      const { data } = await this.userService.loginUser(userData);
      const { accessToken, refreshToken } = data.tokens;

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: 400,
        message: ERROR_EXEPTION.LOGIN,
      });
    }
  }
}
