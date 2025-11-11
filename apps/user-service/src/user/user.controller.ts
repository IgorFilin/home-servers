import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';

import {
  ERROR_EXEPTION,
  LoginDto,
  RegistrationDto,
} from '@home-servers/shared';
import { UserService } from './user.service';
import { AuthService } from './application/auth/auth.service';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

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
      return response;
    } catch (error) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: 400,
        message: ERROR_EXEPTION.LOGIN,
      });
    }
  }

  @MessagePattern({ cmd: 'userInfo' })
  async getUserInfo({ userId }) {
    try {
      const response = await this.userService.getUserInfo(userId);
      return {
        success: true,
        data: {
          name: response.name,
          id: response.id,
          isAcceptKey: response.isAcceptKey,
          role: response.role,
        },
      };
    } catch (error) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: 400,
        message: ERROR_EXEPTION.NOT_EXIST_USER,
      });
    }
  }

  @MessagePattern({ cmd: 'refreshToken' })
  async refreshToken({ refreshToken }) {
    try {
      const responseData = await this.userService.refreshToken(refreshToken);
      return responseData;
    } catch (error) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: 400,
        message: ERROR_EXEPTION.REFRESH_TOKEN_ERROR,
      });
    }
  }

  @MessagePattern({ cmd: 'logout' })
  async logout({ refreshToken }) {
    try {
      const responseData = await this.userService.logout(refreshToken);
      return responseData;
    } catch (error) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: 400,
        message: ERROR_EXEPTION.REFRESH_TOKEN_ERROR,
      });
    }
  }
}
