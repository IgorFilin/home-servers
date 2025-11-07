import { Injectable } from '@nestjs/common';
import { IApiResponse, LoginDto, RegistrationDto } from '@home-servers/shared';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistrationCommand } from './use-cases/command/registration.use-case';
import { LoginCommand } from './use-cases/command/login.use-case';
import { IResponseJwtTokens } from './models';
import { UserRepository } from './infrastructure/repository/user.repository';
import { RefreshQuery } from './use-cases/query/refresh.use-case';

@Injectable()
export class UserService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private userRepository: UserRepository
  ) {}

  createUser(userData: RegistrationDto) {
    return this.commandBus.execute(new RegistrationCommand(userData));
  }

  loginUser(userData: LoginDto): Promise<IApiResponse<IResponseJwtTokens>> {
    return this.commandBus.execute(new LoginCommand(userData));
  }

  async getUserInfo(userId: string) {
    const user = await this.userRepository.findUser({ id: userId });
    return user;
  }

  refreshToken(refreshToken: string) {
    return this.queryBus.execute(new RefreshQuery(refreshToken));
  }
}
