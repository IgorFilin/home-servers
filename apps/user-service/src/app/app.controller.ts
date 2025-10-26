import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { IUser } from '@home-servers/shared';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @MessagePattern({ cmd: 'create_user' })
  getUser(user: IUser) {
    const newUser = this.appService.createUser(user);
    return newUser;
  }
}
