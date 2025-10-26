import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern({ cmd: 'get_user' })
  getUser(id: string) {
    return { id, name: 'John Doe', email: 'john@example.com' };
  }
}
