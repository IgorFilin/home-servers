import { ERROR_EXEPTION, RegistrationDto } from '@home-servers/shared';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../infrastructure/repository/user.repository';
import { RpcException } from '@nestjs/microservices';
import { UserDomain } from '../domain/user.domain';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../application/auth/auth.service';

@Injectable()
export class RegistrationCommand {
  constructor(readonly userData: RegistrationDto) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationCommandHandler
  implements ICommandHandler<RegistrationCommand>
{
  constructor(
    readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  async execute(command: RegistrationCommand) {
    const { email } = command.userData;

    const existedUser = await this.userRepository.findUser({ email });

    if (existedUser) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: ERROR_EXEPTION.USER_ALREADY_EXISTS,
      });
    }

    const user = await UserDomain.create(command.userData);
    await this.userRepository.createUser(user);

    return {
      success: true,
    };
  }
}
