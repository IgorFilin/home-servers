import { ERROR_EXEPTION, RegistrationDto } from '@home-servers/shared';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../infrastructure/repository/user.repository';
import { RpcException } from '@nestjs/microservices';
import { UserDomain } from '../domain/user.domain';
import { JwtService } from '@nestjs/jwt';

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
    private jwtService: JwtService
  ) {}

  async execute(command: RegistrationCommand) {
    const { email, name, password } = command.userData;
    const existedUser = await this.userRepository.findUser(email);
    if (existedUser) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: ERROR_EXEPTION.USER_ALREADY_EXISTS || 'User already exists',
      });
    }

    const user = await UserDomain.create(command.userData);

    const token = this.jwtService.sign(
      {
        name,
      },
      {
        secret: '123123',
        expiresIn: '3d',
      }
    );
    await this.userRepository.createUser(user);
    return {};
  }
}
