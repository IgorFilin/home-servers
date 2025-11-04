import { Injectable } from '@nestjs/common';
import { IApiResponse, LoginDto, RegistrationDto } from '@home-servers/shared';
import { CommandBus } from '@nestjs/cqrs';
import { RegistrationCommand } from './use-cases/registration.use-case';
import { LoginCommand } from './use-cases/login.use-case';
import { IResponseJwtTokens } from './models';

@Injectable()
export class UserService {
  constructor(private commandBus: CommandBus) {}

  createUser(userData: RegistrationDto) {
    return this.commandBus.execute(new RegistrationCommand(userData));
  }

  loginUser(userData: LoginDto): Promise<IApiResponse<IResponseJwtTokens>> {
    return this.commandBus.execute(new LoginCommand(userData));
  }
}
