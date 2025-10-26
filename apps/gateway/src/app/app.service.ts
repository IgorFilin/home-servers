import { USER_SERVICE } from '@home-servers/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy
  ) {}

  getUser(id: string): Observable<any> {
    return this.userService.send({ cmd: 'create_user' }, id);
  }
}
