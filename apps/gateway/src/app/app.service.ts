import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy
  ) {}

  getUser(id: string) {
    return this.userService.send({ cmd: 'get_user' }, id);
  }
}
