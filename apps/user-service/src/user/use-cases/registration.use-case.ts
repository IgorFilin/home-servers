import { RegistrationDto } from '@home-servers/shared';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
export class RegistrationCommand {
  constructor(readonly userData: RegistrationDto) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationCommandHandler
  implements ICommandHandler<RegistrationCommand>
{
  async execute(command: RegistrationCommand) {
    console.log('execute', command.userData);
    return {
      test: 'test',
    };
  }
}
