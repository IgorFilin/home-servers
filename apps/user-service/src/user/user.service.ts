import { Injectable } from '@nestjs/common';
import { IApiResponse, LoginDto, RegistrationDto } from '@home-servers/shared';
import { CommandBus } from '@nestjs/cqrs';
import { RegistrationCommand } from './use-cases/registration.use-case';
import { LoginCommand } from './use-cases/login.use-case';
import { IResponseJwtTokens } from './models';
import { UserRepository } from './infrastructure/repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private commandBus: CommandBus,
    private userRepository: UserRepository
  ) {}

  createUser(userData: RegistrationDto) {
    return this.commandBus.execute(new RegistrationCommand(userData));
  }

  loginUser(userData: LoginDto): Promise<IApiResponse<IResponseJwtTokens>> {
    return this.commandBus.execute(new LoginCommand(userData));
  }

  async getUserInfo(userId: string) {
    console.log('userId', userId);
    const user = await this.userRepository.findUser({ id: userId });
    return user;
  }
}
