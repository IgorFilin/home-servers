import { Controller, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';

import {
  ERROR_EXEPTION,
  LoginDto,
  RegistrationDto,
} from '@home-servers/shared';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../../gateway/src/gateway/guards/jwt-auth.guard';

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
      const response = await this.userService.loginUser(userData);
      console.log('res', response);
      return response;
    } catch (error) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: 400,
        message: ERROR_EXEPTION.LOGIN,
      });
    }
  }

  @MessagePattern({ cmd: 'test' })
  async test() {
    return { test: 'test' };
  }
}
