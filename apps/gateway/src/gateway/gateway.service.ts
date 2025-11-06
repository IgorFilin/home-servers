import {
  IUser,
  LoginDto,
  RegistrationDto,
  USER_SERVICE,
} from '@home-servers/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { defaultIfEmpty, Observable } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy
  ) {}

  registration(userData: RegistrationDto): Observable<any> {
    return this.userService
      .send({ cmd: 'registration' }, userData)
      .pipe(defaultIfEmpty(null));
  }

  login(userData: LoginDto): Observable<any> {
    return this.userService
      .send({ cmd: 'login' }, userData)
      .pipe(defaultIfEmpty(null));
  }

  userInfo(userId: string): Observable<any> {
    return this.userService
      .send({ cmd: 'userInfo' }, { userId })
      .pipe(defaultIfEmpty(null));
  }
}
