import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern({ cmd: 'create_user' })
  getUser(id: string) {
    return { id, name: 'John Doe', email: 'john@example.com' };
  }
}
