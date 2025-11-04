import { ERROR_EXEPTION, LoginDto } from '@home-servers/shared';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../infrastructure/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../application/auth/auth.service';
import { RpcException } from '@nestjs/microservices';
import { IGenerateJwtParams } from '../models';

@Injectable()
export class LoginCommand {
  constructor(readonly userData: LoginDto) {}
}

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    readonly userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async execute(command: LoginCommand) {
    const { email } = command.userData;
    const user = await this.userRepository.findUser(email);

    if (!user) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ERROR_EXEPTION.NOT_EXIST_USER,
      });
    }

    const generateJwtParams: IGenerateJwtParams = {
      id: user.id,
      email,
    };
    const tokens = this.authService.getTokenPair(generateJwtParams);

    return {
      success: true,
      data: {
        tokens,
      },
    };
  }
}
