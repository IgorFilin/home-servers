import { ERROR_EXEPTION, LoginDto } from '@home-servers/shared';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class LoginCommand {
  constructor(readonly userData: LoginDto) {}
}

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor() {}

  async execute(command: LoginCommand) {
    return {
      success: true,
      data: {},
    };
  }
}
