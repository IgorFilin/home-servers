import { IUser, RegistrationDto, USER_SERVICE } from '@home-servers/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy
  ) {}

  registration(userData: RegistrationDto): Observable<any> {
    return this.userService.send({ cmd: 'registration' }, userData);
  }
}
