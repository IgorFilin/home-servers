import { Injectable } from '@nestjs/common';
import { UserRepository } from './infrastructure/repository/user.repository';
import { IUser, RegistrationDto } from '@home-servers/shared';
import { CommandBus } from '@nestjs/cqrs';
import { RegistrationCommand } from './use-cases/registration.use-case';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private commandBus: CommandBus
  ) {}

  async createUser(userData: RegistrationDto) {
    return this.commandBus.execute(new RegistrationCommand(userData));
  }
}
