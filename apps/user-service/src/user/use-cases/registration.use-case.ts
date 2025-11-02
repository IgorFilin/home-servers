import { ERROR_EXEPTION, RegistrationDto } from '@home-servers/shared';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../infrastructure/repository/user.repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RegistrationCommand {
  constructor(readonly userData: RegistrationDto) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationCommandHandler
  implements ICommandHandler<RegistrationCommand>
{
  constructor(readonly userRepository: UserRepository) {}
  async execute(command: RegistrationCommand) {
    const { email, name, password } = command.userData;
    const existedUser = await this.userRepository.findUser(email);
    console.log('existedUser', existedUser);
    if (existedUser) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: ERROR_EXEPTION.USER_ALREADY_EXISTS || 'User already exists',
      });
    }
    return {};
  }
}
